import { Optional } from "@nestjs/common"
import { IsEmail, IsNotEmpty } from "class-validator"

export class RegisterDto {
    @IsNotEmpty()
    readonly name: string
    @IsNotEmpty()
    readonly username: string
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    readonly password: string
    @IsNotEmpty()
    readonly role: string
    @Optional()
    readonly status: boolean
}
