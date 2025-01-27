import { IsEmail, IsNotEmpty, IsOptional, IsString, IsArray, IsInt, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  roles?: number[];  // Array de roles (IDs de los roles)

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  class_groups?: number[];  // Array de IDs de grupos de clase

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  assignments?: number[];  // Array de IDs de asignaciones

  @IsOptional()
  @IsNumber()
  userId?: number;  // ID del usuario relacionado (si aplica)
}
