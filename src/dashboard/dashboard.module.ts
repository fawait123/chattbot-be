import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { VideoSchema } from 'src/schema/video.schema';
import { CaptureSchema } from 'src/schema/capture.schema';
import { QuestionSchema } from 'src/schema/question.schema';
import { ChattSchema } from 'src/schema/chatt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      },
      {
        name: 'Video',
        schema: VideoSchema
      },
      {
        name: 'Capture',
        schema: CaptureSchema
      },
      {
        name: 'Question',
        schema: QuestionSchema
      },
      {
        name: "Chatt",
        schema: ChattSchema
      }
    ])
  ],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule { }
