// import { IsString } from 'class-validator';

// export class CreateSkillDto {
  
//   @IsString()
//   name: string;

//   @IsString()
//   description: string;
// }
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ example: 'JavaScript', description: 'Name of the skill' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Programming language', description: 'Description of the skill' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
