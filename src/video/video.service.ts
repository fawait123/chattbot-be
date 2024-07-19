import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVideoInterface } from 'src/interface/video.interface';
import { generateRandomString, generateThumbnail } from 'src/helpers/utils';
import { IPaginate } from 'src/interface/paginate.interface';
import { Pagination } from 'src/helpers/pagination.helper';
import { Search } from 'src/helpers/search.helper';
import { Request } from 'express';

@Injectable()
export class VideoService {

  constructor(@InjectModel('Video') private videoModel: Model<IVideoInterface>) { }

  async create(createVideoDto: CreateVideoDto) {
    try {
      const thumbnail = await generateThumbnail(createVideoDto.source, './public/uploads/thumbnails', 'public/uploads/thumbnails/' + generateRandomString(10) + '.png')
      createVideoDto.thumbnail = thumbnail
      console.log(createVideoDto)
      return await this.videoModel.create(createVideoDto)
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }

  async findAll(req: Request) {
    try {
      const paginate = new Pagination(req)
      const search = new Search(req, ['username', 'email', 'name'])
      console.log('serch', JSON.stringify(search.search))
      const data = await this.videoModel.find(search.search).skip(paginate.getPagination().offset).limit(paginate.getPagination().limit)
      const total = await this.videoModel.countDocuments(search.search)

      return <IPaginate<IVideoInterface>>{
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
      return await this.videoModel.findById(id)
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    try {
      return await this.videoModel.findByIdAndUpdate(id, updateVideoDto, { new: true })
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }

  async remove(id: string) {
    try {
      return await this.videoModel.findByIdAndDelete(id)
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
