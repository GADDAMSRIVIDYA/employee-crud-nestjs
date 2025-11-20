import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { getSkillsDto } from './dto/get-skills.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}
  @Roles('admin')
   @Get()
  getAll() {
    return this.skillsService.getAll();
  }

  @Roles('admin')
  @Get(':id')
  getById(@Param() Params: getSkillsDto) {
    return this.skillsService.getById(Params.id);
  }
@Roles('admin')
  @Post()
  create(@Body() createDto: CreateSkillDto) {
    return this.skillsService.create(createDto);
  }
  @Roles('admin')
  @Patch(':id')
  update(@Param() Params: getSkillsDto, @Body() updateDto: UpdateSkillDto) {
    return this.skillsService.update(Params.id, updateDto);
  }
@Roles('admin')
  @Delete(':id')
  remove(@Param() Params: getSkillsDto) {
    return this.skillsService.remove(Params.id);
  }
}
