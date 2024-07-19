import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from 'src/schema/video.schema';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { existsSync, mkdirSync } from 'fs';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Video",
        schema: VideoSchema
      }
    ]),
    MulterModule.register({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          const path = "./public/uploads/video"
          if (!existsSync(path)) {
            mkdirSync(path, { recursive: true })
          }
          cb(null, path)
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          const [_, mimeType] = file.mimetype.split("/")
          cb(null, file.fieldname + '-' + uniqueSuffix + "." + mimeType)
        }
      })
    })
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule { }
