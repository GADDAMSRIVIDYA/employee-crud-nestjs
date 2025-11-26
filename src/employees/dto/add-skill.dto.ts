 import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddSkillDto {
  @ApiProperty({ example: '691c602c43c17d81ea6dacb5', description: 'ID of the skill to add' })
  @IsString()
  @IsNotEmpty()
  skillId: string;
}
