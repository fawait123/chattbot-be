import { Module } from '@nestjs/common';
import { ChattService } from './chatt.service';
import { ChattController } from './chatt.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChattSchema } from 'src/schema/chatt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Chatt',
        schema: ChattSchema
      }
    ])
  ],
  controllers: [ChattController],
  providers: [ChattService],
})
export class ChattModule { }
