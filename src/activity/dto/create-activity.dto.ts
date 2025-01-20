import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  difficulty: string;

  @IsInt()
  @IsNotEmpty()
  topicId: number;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  students?: number[]; // IDs de los estudiantes relacionados
}
