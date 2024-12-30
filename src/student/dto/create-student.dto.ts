import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, IsEmail, Min } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    lastname: string;
  
    @IsInt()
    @IsOptional()
    points?: number;
  
    @IsInt()
    @IsNotEmpty()
    userId: number;
  }