import { Injectable } from '@nestjs/common';
import { CreateGenerateDto } from './dto/create-generate.dto';
import { UpdateGenerateDto } from './dto/update-generate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { IUserInterface } from 'src/interface/user.interface';
import { hashPassword } from 'src/helpers/utils';

@Injectable()
export class GenerateService {
  constructor(@InjectModel("User") private readonly userModel: Model<IUserInterface>) { }
  async create(createGenerateDto: CreateGenerateDto) {
    return this.userModel.create({
      name: "Super Admin",
      username: "superadmin",
      email: "admin@admin.com",
      password: await hashPassword("123@Password"),
      role: "superadmin",
      status: true,
    })
  }

  findAll() {
    return `This action returns all generate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generate`;
  }

  update(id: number, updateGenerateDto: UpdateGenerateDto) {
    return `This action updates a #${id} generate`;
  }

  remove(id: number) {
    return `This action removes a #${id} generate`;
  }
}
