import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProfileDto, ResetPassword } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserInterface } from 'src/interface/user.interface';
import { Request } from 'express';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { comparePassword, hashPassword } from 'src/helpers/utils';

@Injectable()
export class ProfileService {

  constructor(@InjectModel('User') private readonly userModel: Model<IUserInterface>) { }

  profile(req: any) {
    try {
      const user = this.userModel.findOne({
        email: req.user.email || null
      })
      return user
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(req: any, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findOne({
        email: req.user.email
      })
      const exist = await this.userModel.findOne({
        $or: [
          { username: updateUserDto.username },
          { email: updateUserDto.email }
        ],
        _id: { $ne: user._id }
      })

      if (exist) {
        throw new BadRequestException(`Data ${updateUserDto.username} atau ${updateUserDto.email} sudah di gunakan`)
      }


      return await this.userModel.findByIdAndUpdate(user._id, updateUserDto, { new: true })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async resetPassword(resetPassword: ResetPassword, req: any) {
    try {
      const user = await this.userModel.findOne({
        email: req.user.email
      })

      if (!await comparePassword(resetPassword.passwordNew, user.password)) {
        throw new NotFoundException('Password lama tidak valid')
      }

      await this.userModel.findByIdAndUpdate(user._id, { password: await hashPassword(resetPassword.passwordNew) })

      return user
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
