import { HttpStatus, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserInterface } from 'src/interface/user.interface';
import { comparePassword } from 'src/helpers/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(@InjectModel('User') private userModel: Model<IUserInterface>, private jwtService: JwtService) { }
    async login(creadential: LoginDto) {
        try {
            const user = await this.userModel.findOne({
                username: creadential.username
            })

            if (!user) {
                throw new NotFoundException('Data credential tidak valid')
            }

            if (!await comparePassword(creadential.password, user.password)) {
                throw new NotFoundException('Data credential tidak valid')
            }

            if (user.status == false) {
                throw new NotAcceptableException('Akun anda tidak aktif, silahkan hubungi admin')
            }

            const payload = {
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
                sub: user.id
            }

            return {
                token: await this.jwtService.signAsync(payload),
                user: payload
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async loginMobile(creadential: LoginDto) {
        try {
            const user = await this.userModel.findOne({
                username: creadential.username
            })

            if (!user) {
                throw new NotFoundException('Data credential tidak valid')
            }

            if (!await comparePassword(creadential.password, user.password)) {
                throw new NotFoundException('Data credential tidak valid')
            }

            if (user.status == false) {
                throw new NotAcceptableException('Akun anda tidak aktif, silahkan hubungi admin')
            }

            if (user.role != "user") {
                throw new NotAcceptableException("Anda tidak di ijinkan mengakses aplikasi mobile")
            }

            const payload = {
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
                sub: user.id
            }

            return {
                token: await this.jwtService.signAsync(payload),
                user: payload
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
