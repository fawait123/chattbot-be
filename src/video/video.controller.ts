import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpStatus, ParseFilePipeBuilder, Req } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @Post()
  @UseInterceptors(FileInterceptor('source'))
  create(@Body() createVideoDto: CreateVideoDto, @UploadedFile(new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: 'mp4',
    })
    .addMaxSizeValidator({
      maxSize: 5000000
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),) source: Express.Multer.File) {
    createVideoDto.source = source.path
    return this.videoService.create(createVideoDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.videoService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('source'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto, @UploadedFile(new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: 'mp4',
    })
    .addMaxSizeValidator({
      maxSize: 5000000
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),) source: Express.Multer.File) {
    updateVideoDto.source = source.path
    return this.videoService.update(id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(id);
  }
}
