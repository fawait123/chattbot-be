import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuestion } from 'src/interface/question.interface';
import { Pagination } from 'src/helpers/pagination.helper';
import { Search } from 'src/helpers/search.helper';
import { Request } from 'express';
import { IPaginate } from 'src/interface/paginate.interface';

@Injectable()
export class QuestionService {


  constructor(@InjectModel('Question') private readonly questionModel: Model<IQuestion>) { }

  async create(CreateQuestionDto: CreateQuestionDto) {
    try {
      return await this.questionModel.create({ ...CreateQuestionDto })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll(req: Request) {
    try {
      const paginate = new Pagination(req)
      const search = new Search(req, ['username', 'email', 'name'])
      console.log('serch', JSON.stringify(search.search))
      const data = await this.questionModel.find(search.search).skip(paginate.getPagination().offset).limit(paginate.getPagination().limit)
      const total = await this.questionModel.countDocuments(search.search)

      return <IPaginate<IQuestion>>{
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
      return await this.questionModel.findById(id)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: string, UpdateQuestionDto: UpdateQuestionDto) {
    try {
      console.log(id)

      return await this.questionModel.findByIdAndUpdate(id, UpdateQuestionDto, { new: true })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: string) {
    try {
      return await this.questionModel.findByIdAndDelete(id)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
