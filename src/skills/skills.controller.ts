import { 
  Controller, Get, Post, Patch, Delete, Param, Body, Query, BadRequestException 
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { getSkillsDto } from './dto/get-skills.dto';
import { GetSkillsQueryDto } from './dto/get-skill-query.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { validatePaginationQuery } from 'src/common/validators/pagination.validator';


@ApiTags('skills')
@ApiBearerAuth()
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

@Get()
@ApiOperation({ summary: 'Get all skills with optional pagination' })
@ApiResponse({ status: 200, description: 'List of skills' })
@ApiResponse({ status: 400, description: 'Invalid query parameters' })
async getAll(@Query() query: PaginationQueryDto) {
  const { pagination, from, to ,filter, sort} = validatePaginationQuery(query.pagination,
    query.from,query.to,query.search, query.searchField, query.op,query.sortField,query.sortOrder);
  return this.skillsService.getAll(pagination, from, to,filter, sort);
}


  @Get(':id')
  @ApiOperation({ summary: 'Get a skill by ID' })
  @ApiResponse({ status: 200, description: 'Skill found' })
  getById(@Param() params: getSkillsDto) {
    return this.skillsService.getById(params.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new skill' })
  @ApiResponse({ status: 201, description: 'Skill created successfully' })
  create(@Body() createDto: CreateSkillDto) {
    return this.skillsService.create(createDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a skill by ID' })
  @ApiResponse({ status: 200, description: 'Skill updated successfully' })
  update(@Param() params: getSkillsDto, @Body() updateDto: UpdateSkillDto) {
    return this.skillsService.update(params.id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a skill by ID' })
  @ApiResponse({ status: 200, description: 'Skill deleted successfully' })
  remove(@Param() params: getSkillsDto) {
    return this.skillsService.remove(params.id);
  }
}
