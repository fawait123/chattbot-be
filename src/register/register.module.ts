import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.serive';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "User",
                schema: UserSchema
            }
        ]),
    ],
    controllers: [RegisterController],
    providers: [RegisterService],
})
export class RegisterModule { }
