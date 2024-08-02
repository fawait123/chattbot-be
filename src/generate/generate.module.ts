import { Module } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { GenerateController } from './generate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "User",
      schema: User
    }])
  ],
  controllers: [GenerateController],
  providers: [GenerateService],
})
export class GenerateModule { }
