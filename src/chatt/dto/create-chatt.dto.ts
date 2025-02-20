import { IsNotEmpty } from "class-validator";

export class CreateChattDto {
    @IsNotEmpty()
    message: string
}
