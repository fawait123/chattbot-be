import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { ResetPassword } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  profile(@Req() req: Request) {
    return this.profileService.profile(req)
  }

  @Post()
  updateProfile(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    return this.profileService.update(req, updateUserDto)
  }

  @Post("reset-password")
  resetPassword(@Body() resetPassword: ResetPassword, @Req() req: Request) {
    return this.profileService.resetPassword(resetPassword, req)
  }
}
