import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  term: string;

  @IsString()
  @IsNotEmpty()
  schedule: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  @IsNotEmpty()
  teacherId: number;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  students?: number[]; // IDs de los estudiantes relacionados
}
