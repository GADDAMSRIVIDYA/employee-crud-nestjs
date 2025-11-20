import { IsString, IsEmail, IsArray, IsOptional, IsEnum } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  empNumber: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  position: string;

  @IsString()
  hireDate: string;

  @IsArray()
  @IsOptional()
  skills?: string[];

  @IsEnum(['admin','employee'])
  role: string;

  @IsString()
  password: string;
}
