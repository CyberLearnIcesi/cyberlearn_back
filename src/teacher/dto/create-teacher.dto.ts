import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, IsArray } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @IsOptional()
  courseIds?: number[];
}
