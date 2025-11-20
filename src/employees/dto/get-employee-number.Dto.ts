import { IsString } from "class-validator";
 
export class getEmployeeNumberDto{
    @IsString()
    empNumber:string;
}