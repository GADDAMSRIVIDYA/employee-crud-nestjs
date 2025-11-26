// import { IsString } from "class-validator";
 
// export class getEmployeeNumberDto{
//     @IsString()
//     empNumber:string;
// }
import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class GetEmployeeNumberDto{
    @ApiProperty({ example: 'E003', description: 'Employee number' })
    @IsString()
    empNumber:string;
}
