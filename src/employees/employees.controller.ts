import { Controller } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import{ Get, Post, Patch, Delete, Param, Body,UseGuards} from '@nestjs/common';
import {CreateEmployeeDto} from './dto/create-employee.dto';
import { getEmployeeDto } from './dto/get-employee-id.Dto';

import {UpdateEmployeeDto} from './dto/update-employee.dto';
import { getEmployeeNumberDto } from './dto/get-employee-number.Dto';

import { EmployeesService } from './employees.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { AddSkillDto } from './dto/add-skill.dto';
import { Req } from '@nestjs/common';


@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeeService: EmployeesService) {}

  @Roles('admin')
  @Post('add')
  create(@Body() createDto: CreateEmployeeDto) {
    return this.employeeService.create(createDto);
  }
  @Roles('admin')
  @Patch('update/:id')
  update(@Param() Params:getEmployeeDto, @Body() updateDto: UpdateEmployeeDto) {
    return this.employeeService.update(Params.id, updateDto);
  }
  @Roles('admin')
  @Get()
  getAll() {
    return this.employeeService.getAll();
  }


  @Roles('admin')
  @Get('id/:id')
  getById(@Param() params: getEmployeeDto) {
  return this.employeeService.getById(params.id);
}

  @Get('empNumber/:empNumber')
  getByEmpNumber(@Param() params: getEmployeeNumberDto, @Req() req) {
  return this.employeeService.getByEmpNumber(params.empNumber, req.user);
}


  @Roles('admin')  
  @Delete('delete/:id')
  remove(@Param() Params:getEmployeeDto) {
    return this.employeeService.remove(Params.id);
  }

  @Roles('admin')
  @Post(':id/skills')
  addSkill(@Param() params: getEmployeeDto,@Body() body: AddSkillDto) {
  return this.employeeService.addSkillToEmployee(params.id, body.skillId);
}

}
    


