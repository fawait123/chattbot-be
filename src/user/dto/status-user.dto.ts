import { IsNotEmpty } from "class-validator"

export class ChangeStatusUserDto {
    @IsNotEmpty()
    readonly status: boolean
}
