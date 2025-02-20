import { Optional } from "@nestjs/common"
import { IsEmail, IsNotEmpty } from "class-validator"

export class UpdateUserDto {
    @IsNotEmpty()
    readonly name: string
    @IsNotEmpty()
    readonly username: string
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    readonly role: string
    @Optional()
    readonly status: boolean
}
