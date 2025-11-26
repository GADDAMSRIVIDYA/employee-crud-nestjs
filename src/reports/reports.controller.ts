import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { validatePaginationQuery } from 'src/common/validators/pagination.validator';
import { GetSkillPopularityQueryDto } from './dto/get-skill-popularity-query.dto';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

@Get('skill-popularity')
@ApiOperation({ summary: 'Get skill popularity report' })
@ApiResponse({ status: 200, description: 'Skill popularity data retrieved successfully' })
@ApiResponse({ status: 400, description: 'Invalid query parameters' })
async getSkillPopularity(@Query() query: GetSkillPopularityQueryDto) {
  const { pagination, from, to } = validatePaginationQuery(
    query.pagination,
    query.from,
    query.to,
  );
  return this.reportsService.getSkillPopularity(pagination, from, to);
}

}
