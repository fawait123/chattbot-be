import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCaptureDto } from './dto/create-capture.dto';
import { UpdateCaptureDto } from './dto/update-capture.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICapture } from 'src/interface/capture.interface';
import { uploadFileBuffer } from 'src/helpers/upload.helper';
import { Pagination } from 'src/helpers/pagination.helper';
import { Search } from 'src/helpers/search.helper';
import { IPaginate } from 'src/interface/paginate.interface';
import { Request } from 'express';

@Injectable()
export class CaptureService {

  constructor(@InjectModel('Capture') private captureModel: Model<ICapture>) { }

  async create(createCaptureDto: CreateCaptureDto, source: Express.Multer.File, req: any) {
    try {
      const fileName = await uploadFileBuffer('./public/capture', source.buffer, source.mimetype)
      createCaptureDto.source = fileName as string
      createCaptureDto.userID = req.user.sub
      return this.captureModel.create(createCaptureDto)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll(req: Request) {
    try {
      const paginate = new Pagination(req)
      const search = new Search(req, ['username', 'email', 'name'])
      console.log('serch', JSON.stringify(search.search))
      const data = await this.captureModel.find(search.search).populate('userID').skip(paginate.getPagination().offset).limit(paginate.getPagination().limit)
      const total = await this.captureModel.countDocuments(search.search)

      return <IPaginate<ICapture>>{
        page: paginate.getPage().page,
        limit: paginate.getPage().limit,
        total: total,
        data: data
      }
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} capture`;
  }

  update(id: number, updateCaptureDto: UpdateCaptureDto) {
    return `This action updates a #${id} capture`;
  }

  remove(id: number) {
    return `This action removes a #${id} capture`;
  }
}
