// import { PartialType } from '@nestjs/mapped-types';
// import { CreateSkillDto } from './create-skill.dto';

// export class UpdateSkillDto extends PartialType(CreateSkillDto) {}


import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
  @ApiPropertyOptional({example:'sql'})
  name?: string;

  @ApiPropertyOptional({ description: 'Language description',example:'Structured Query Language' })
  description?: string;
}
