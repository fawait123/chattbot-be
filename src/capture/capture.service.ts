import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCaptureDto } from './dto/create-capture.dto';
import { UpdateCaptureDto } from './dto/update-capture.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICapture } from 'src/interface/capture.interface';
import { uploadFileBuffer } from 'src/helpers/upload.helper';

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

  findAll() {
    return `This action returns all capture`;
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
