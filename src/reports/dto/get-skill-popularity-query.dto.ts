import { IsOptional, IsNumber, IsBooleanString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetSkillPopularityQueryDto {
  @ApiPropertyOptional({ description: 'Enable/disable pagination', example: 'true' })
  @IsOptional()
  @IsBoolean()
   @Type(() => Boolean)
  pagination?: boolean;

  @ApiPropertyOptional({ description: 'Start index for pagination', example: '0' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  from?: number;

  @ApiPropertyOptional({ description: 'Number of records to fetch', example: '10' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  to?: number;
}
