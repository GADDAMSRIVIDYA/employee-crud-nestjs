import { IsString, IsNotEmpty } from 'class-validator';

export class AddSkillDto {
  @IsString()
  @IsNotEmpty()
  skillId: string;
}
