import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, IsEmail, Min } from 'class-validator';

export class CreateTopicDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsInt()
    @IsNotEmpty()
    classId: number;
  }