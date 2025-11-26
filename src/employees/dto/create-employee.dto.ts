 import { IsString, IsEmail, IsArray, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'E003', description: 'Unique employee number' })
  @IsString()
  empNumber: string;

  @ApiProperty({ example: 'Raju', description: 'Full name of the employee' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'raju@gmail.com', description: 'Employee email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Software Developer', description: 'Position of the employee' })
  @IsString()
  position: string;

  @ApiProperty({ example: '2025-11-14', description: 'Hire date in YYYY-MM-DD format' })
  @IsString()
  hireDate: string;

  @ApiPropertyOptional({ example: ['691c602c43c17d81ea6dacb5'], description: 'Array of skill IDs' })
  @IsArray()
  @IsOptional()
  skills?: string[];

  @ApiProperty({ example: 'employee', enum: ['admin','employee'], description: 'Role of the employee' })
  @IsEnum(['admin','employee'])
  role: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password for the employee account' })
  @IsString()
  password: string;
}
