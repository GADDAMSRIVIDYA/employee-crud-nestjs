// import { IsString }  from "class-validator";

// export class getEmployeeDto{
//     @IsString()
//     id:string;
// }

import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class GetEmployeeDto{
    @ApiProperty({ example: '691c5b7cfad9dc6378218b3c', description: 'Employee ID' })
    @IsString()
    id:string;
}
