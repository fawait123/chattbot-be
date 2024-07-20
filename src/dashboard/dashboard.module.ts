import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { VideoSchema } from 'src/schema/video.schema';
import { CaptureSchema } from 'src/schema/capture.schema';
import { QuestionSchema } from 'src/schema/question.schema';

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
      }
    ])
  ],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule { }
