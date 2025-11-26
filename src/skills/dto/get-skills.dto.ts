// import { IsString } from "class-validator";

// export class getSkillsDto{ 
//   @IsString()
//   id: string;
// }

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class getSkillsDto {
  @ApiProperty({ example: '691c602c43c17d81ea6dacb5', description: 'Skill ID' })
  @IsString()
  id: string;
}
