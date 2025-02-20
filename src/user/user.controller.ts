import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { Request } from 'express';
import { ChangeStatusUserDto } from './dto/status-user.dto';

@Controller('user')
@UseGuards(AuthMiddleware)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('change-status/:id')
  changeStatus(@Param('id') id: string, @Body() changeStatusUser: ChangeStatusUserDto) {
    return this.userService.changeStatus(changeStatusUser, id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({ ...createUserDto });
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.userService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
