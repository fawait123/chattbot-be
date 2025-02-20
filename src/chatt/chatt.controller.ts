import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ChattService } from './chatt.service';
import { CreateChattDto } from './dto/create-chatt.dto';
import { UpdateChattDto } from './dto/update-chatt.dto';
import { Request } from 'express';
import { toUserProfileResponse } from 'src/helpers/utils';

@Controller('chatt')
export class ChattController {
  constructor(private readonly chattService: ChattService) { }

  @Post('message')
  message(@Body() chattDto: CreateChattDto, @Req() req: any) {
    const user = req.user
    return this.chattService.message(chattDto, toUserProfileResponse(user))
  }

  @Post()
  create(@Body() createChattDto: CreateChattDto) {
    return this.chattService.create(createChattDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.chattService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chattService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChattDto: UpdateChattDto) {
    return this.chattService.update(+id, updateChattDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chattService.remove(+id);
  }
}
