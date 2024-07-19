import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChattDto } from './dto/create-chatt.dto';
import { UpdateChattDto } from './dto/update-chatt.dto';
import { BotHelper } from 'src/helpers/bot.helper';
import { IUserProfile } from 'src/interface/user-profile.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChatt } from 'src/interface/chatt.interface';



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
                response: item.text,
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

  findAll() {
    return `This action returns all chatt`;
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
