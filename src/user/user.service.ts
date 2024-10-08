import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserInterface } from 'src/interface/user.interface';
import { hashPassword } from 'src/helpers/utils';
import { Request } from 'express';
import { IPaginate } from 'src/interface/paginate.interface';
import { Pagination } from 'src/helpers/pagination.helper';
import { Search } from 'src/helpers/search.helper';
import { ChangeStatusUserDto } from './dto/status-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private userModel: Model<IUserInterface>) { }

  async changeStatus(statusDto: ChangeStatusUserDto, id: string) {
    try {
      console.log('id', id)
      await this.userModel.findByIdAndUpdate(id, {
        status: statusDto.status
      })

      return 'successfully'
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const exist = await this.userModel.findOne({
        $or: [
          {
            username: createUserDto.username
          }, {
            email: createUserDto.email
          }
        ]
      })

      if (exist) {
        throw new BadRequestException(`Data ${createUserDto.username} atau ${createUserDto.email} sudah di gunakan`)
      }

      return await this.userModel.create({ ...createUserDto, password: await hashPassword(createUserDto.password) })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll(req: Request) {
    try {
      const paginate = new Pagination(req)
      const search = new Search(req, ['username', 'email', 'name'])
      console.log('serch', JSON.stringify(search.search))
      const data = await this.userModel.find(search.search).sort({ createdAt: "asc" }).skip(paginate.getPagination().offset).limit(paginate.getPagination().limit)
      const total = await this.userModel.countDocuments(search.search)

      return <IPaginate<IUserInterface>>{
        page: paginate.getPage().page,
        limit: paginate.getPage().limit,
        total: total,
        data: data
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findById(id)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const exist = await this.userModel.findOne({
        $or: [
          { username: updateUserDto.username },
          { email: updateUserDto.email }
        ],
        _id: { $ne: id }
      })

      console.log(exist)

      if (exist) {
        throw new BadRequestException(`Data ${updateUserDto.username} atau ${updateUserDto.email} sudah di gunakan`)
      }
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
