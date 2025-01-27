import { IsInt, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateAssignmentDto {
  @IsOptional()
  @IsNumber()
  grade?: number;

  @IsOptional() 
  @IsDate()
  completedAt?: Date;

  @IsInt()
  user_id: number; 

  @IsInt()
  activity_id: number; 
}
