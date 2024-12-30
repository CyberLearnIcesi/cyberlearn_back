import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, IsEmail, Min } from 'class-validator';

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
  }