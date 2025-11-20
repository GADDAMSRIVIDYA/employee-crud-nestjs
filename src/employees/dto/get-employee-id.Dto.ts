import { IsString }  from "class-validator";

export class getEmployeeDto{
    @IsString()
    id:string;
}