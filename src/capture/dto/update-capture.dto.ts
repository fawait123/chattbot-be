import { IsNotEmpty } from 'class-validator';

export class UpdateCaptureDto {
    @IsNotEmpty()
    note: string
}
