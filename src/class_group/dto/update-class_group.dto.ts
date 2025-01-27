import { PartialType } from '@nestjs/mapped-types';
import { CreateClassGroupDto } from './create-class_group.dto';

export class UpdateClassGroupDto extends PartialType(CreateClassGroupDto) {}
