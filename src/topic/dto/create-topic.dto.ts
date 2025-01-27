import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  courseId: number;

  @IsArray()
  @IsOptional()
  activityIds?: number[];
}
