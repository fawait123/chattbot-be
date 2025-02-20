import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: "User",
          schema: User
        }
      ]
    )
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule { }
