import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChattDto } from './dto/create-chatt.dto';
import { UpdateChattDto } from './dto/update-chatt.dto';
import { BotHelper } from 'src/helpers/bot.helper';
import { IUserProfile } from 'src/interface/user-profile.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChatt } from 'src/interface/chatt.interface';
import { Pagination } from 'src/helpers/pagination.helper';
import { Search } from 'src/helpers/search.helper';
import { IPaginate } from 'src/interface/paginate.interface';
import { Request } from 'express';



@Injectable()
export class ChattService {

  constructor(@InjectModel('Chatt') private chattModel: Model<IChatt>) { }

  async message(chattDto: CreateChattDto, user: IUserProfile) {
    try {
      const chatt = await (new BotHelper().message(chattDto.message))
      await Promise.all(
        chatt.response.candidates.map(async (item: any) => {
          await Promise.all(
            item.content.parts.map(async (item: any) => {
              return await this.chattModel.create({
                userID: user.id,
                message: chattDto.message,
                response: item.text.replaceAll('\n\n', ' ').replaceAll('*', '').replaceAll("#", ''),
                createdAt: new Date(),
                updatedAt: new Date()
              })
            })
          )
        })
      )
      return chatt;
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  create(createChattDto: CreateChattDto) {
    return 'This action adds a new chatt';
  }

  async findAll(req: Request) {
    try {
      const paginate = new Pagination(req)
      const search = new Search(req, ['response', 'message'])
      const data = await this.chattModel.find(search.search).skip(paginate.getPagination().offset).limit(paginate.getPagination().limit)
      const total = await this.chattModel.countDocuments(search.search)

      return <IPaginate<IChatt>>{
        page: paginate.getPage().page,
        limit: paginate.getPage().limit,
        total: total,
        data: data
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} chatt`;
  }

  update(id: number, updateChattDto: UpdateChattDto) {
    return `This action updates a #${id} chatt`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatt`;
  }
}
