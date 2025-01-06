import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, IsEmail, Min } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsOptional()
    roleId?: number;
  }