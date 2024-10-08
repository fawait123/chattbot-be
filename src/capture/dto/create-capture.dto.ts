import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateCaptureDto {
    @IsNotEmpty()
    date: string
    @IsOptional()
    source: string
    @IsOptional()
    userID: string
}

export class CreateNoteCaptureDto {
    @IsNotEmpty()
    note: string
}
