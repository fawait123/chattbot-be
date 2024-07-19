import { Module } from '@nestjs/common';
import { CaptureService } from './capture.service';
import { CaptureController } from './capture.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CaptureSchema } from 'src/schema/capture.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Capture',
        schema: CaptureSchema
      }
    ])
  ],
  controllers: [CaptureController],
  providers: [CaptureService],
})
export class CaptureModule { }
