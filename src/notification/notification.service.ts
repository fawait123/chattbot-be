import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INotification } from 'src/interface/notification.interface';
import { Pagination } from 'src/helpers/pagination.helper';
import { Search } from 'src/helpers/search.helper';
import { IPaginate } from 'src/interface/paginate.interface';
import { Request } from 'express';

@Injectable()
export class NotificationService {

  constructor(@InjectModel('Notification') private readonly notificationModel: Model<INotification>) { }

  async create(createUserDto: CreateNotificationDto, req: any) {
    try {
      createUserDto.userID = req.user.sub
      return await this.notificationModel.create({ ...createUserDto })
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }

  async findAll(req: Request) {
    try {
      const paginate = new Pagination(req)
      const search = new Search(req, ['title', 'body'])
      console.log('serch', JSON.stringify(search.search))
      const data = await this.notificationModel.find(search.search).skip(paginate.getPagination().offset).limit(paginate.getPagination().limit)
      const total = await this.notificationModel.countDocuments(search.search)

      return <IPaginate<INotification>>{
        page: paginate.getPage().page,
        limit: paginate.getPage().limit,
        total: total,
        data: data
      }
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: string) {
    try {
      return await this.notificationModel.findById(id)
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }

  async update(id: string, updateUserDto: UpdateNotificationDto, req: any) {
    try {
      updateUserDto.userID = req.user.sub
      return await this.notificationModel.findByIdAndUpdate(id, updateUserDto, { new: true })
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }

  async remove(id: string) {
    try {
      return await this.notificationModel.findByIdAndDelete(id)
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
