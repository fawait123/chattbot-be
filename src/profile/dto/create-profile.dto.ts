import { IsNotEmpty } from "class-validator";

export class CreateProfileDto { }


export class ResetPassword {
    @IsNotEmpty()
    passwordOld: string

    @IsNotEmpty()
    passwordNew: string
}