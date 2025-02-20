import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { RegisterService } from './register.serive';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }

    @Post('')
    login(@Body() registerDto: RegisterDto) {
        return this.registerService.register(registerDto)
    }
}
