import { IsOptional, IsNumberString, IsBooleanString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetEmployeeQueryDto {
  @ApiPropertyOptional({ description: 'Enable/disable pagination', example: 'true' })
  @IsOptional()
  @IsBoolean()
   @Type(() => Boolean)
  pagination?: boolean;

  @ApiPropertyOptional({ description: 'Start index for pagination', example: '0' })
  @IsOptional()
  @IsNumberString()
  from?: number;

  @ApiPropertyOptional({ description: 'Number of records to fetch', example: '10' })
  @IsOptional()
  @IsNumberString()
  to?: number;
}
