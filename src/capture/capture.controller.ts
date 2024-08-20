import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { CaptureService } from './capture.service';
import {
  CreateCaptureDto,
  CreateNoteCaptureDto,
} from './dto/create-capture.dto';
import { UpdateCaptureDto } from './dto/update-capture.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('capture')
export class CaptureController {
  constructor(private readonly captureService: CaptureService) { }

  @Post()
  @UseInterceptors(FileInterceptor('source'))
  create(
    @Body() createCaptureDto: CreateCaptureDto,
    @UploadedFile() source: Express.Multer.File,
    @Req() req: Request,
  ) {
    source.mimetype = 'image/' + source.originalname.split('.')[1];
    return this.captureService.create(createCaptureDto, source, req);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.captureService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.captureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaptureDto: UpdateCaptureDto) {
    return this.captureService.update(id, updateCaptureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.captureService.remove(+id);
  }
}
