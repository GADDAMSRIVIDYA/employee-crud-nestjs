import { IsOptional, IsNumber, IsBoolean, IsIn, IsString,ValidateIf,IsDefined } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
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
  // ----------------- SEARCH FIELDS -----------------

  @ApiPropertyOptional({
    description: 'Search field name',
    example: 'name',
  })
  @IsOptional()
  @IsString()
  searchField?: string;

  @ApiPropertyOptional({
    description: 'Search value (string or number). Required if searchField is provided.',
    example: 'John or 40',
    type: String,
  })
  @ValidateIf(o => o.searchField !== undefined) // validate only if searchField exists
  @IsDefined({ message: 'search value must be provided if searchField is set' }) // required
  search?: string;

  @ApiPropertyOptional({
    description: 'Comparison operator (MongoDB)',
    example: 'gt',
    enum: ['eq', 'gt', 'lt', 'gte', 'lte'],
  })
  @IsOptional()
  @IsIn(['eq', 'gt', 'lt', 'gte', 'lte'])
  op?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte';

  // ----------------- SORT FIELDS -----------------
  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'empNumber',
  })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
