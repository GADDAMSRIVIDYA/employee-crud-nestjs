import { IsString } from "class-validator";

export class getSkillsDto{ 
  @IsString()
  id: string;
}
