import { PartialType } from '@nestjs/mapped-types';
import { CreateCaptureDto } from './create-capture.dto';

export class UpdateCaptureDto extends PartialType(CreateCaptureDto) {}
