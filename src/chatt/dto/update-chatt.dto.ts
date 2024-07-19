import { PartialType } from '@nestjs/mapped-types';
import { CreateChattDto } from './create-chatt.dto';

export class UpdateChattDto extends PartialType(CreateChattDto) {}
