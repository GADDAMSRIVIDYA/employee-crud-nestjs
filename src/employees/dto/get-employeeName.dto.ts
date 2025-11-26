import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class GetEmployeeNameDto{
    @ApiProperty({ example: 'John Doe', description: 'Employee name' })
    @IsString()
    name:string;
}