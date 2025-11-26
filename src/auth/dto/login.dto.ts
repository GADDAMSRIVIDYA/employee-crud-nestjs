import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User email', example: 'raju@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'rajuP@ssword123' })
  @IsString()
  password: string;
}
