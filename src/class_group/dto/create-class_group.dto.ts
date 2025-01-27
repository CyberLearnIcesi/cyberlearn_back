import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateClassGroupDto {
  @IsString()
  code: string;

  @IsString()
  schedule: string;

  @IsString()
  location: string;

  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds?: number[];
}
