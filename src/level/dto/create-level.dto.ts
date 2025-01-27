import { IsString } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  main_icon: string;
}
