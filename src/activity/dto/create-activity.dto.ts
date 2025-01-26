import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  points: string;

  @IsNumber()
  topicId: number; // ID del topic relacionado

  @IsNumber()
  levelId: number; // ID del level relacionado

  @IsOptional()
  @IsNumber({}, { each: true })
  userIds?: number[]; // IDs de los usuarios relacionados (opcional)
}
