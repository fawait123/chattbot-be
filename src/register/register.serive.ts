import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserInterface } from 'src/interface/user.interface';
import { hashPassword } from 'src/helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { credential } from 'firebase-admin';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class RegisterService {
    constructor(@InjectModel('User') private userModel: Model<IUserInterface>, private jwtService: JwtService) { }
    async register(credential: RegisterDto) {
        try {
            const exist = await this.userModel.findOne({
                $or: [
                    {
                        username: credential.username
                    }, {
                        email: credential.email
                    }
                ]
            })

            if (exist) {
                throw new BadRequestException(`Data ${credential.username} atau ${credential.email} sudah di gunakan`)
            }

            return await this.userModel.create({ ...credential, password: await hashPassword(credential.password) })
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
