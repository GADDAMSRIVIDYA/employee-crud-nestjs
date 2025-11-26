import { Controller, Get, Post, Patch, Delete, Param, Body, Req, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { GetEmployeeDto } from './dto/get-employee-id.Dto';
import { GetEmployeeNumberDto } from './dto/get-employee-number.Dto';
import { AddSkillDto } from './dto/add-skill.dto';
import { GetEmployeeNameDto } from './dto/get-employeeName.dto';

import { Roles } from 'src/auth/decorators/roles.decorators';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { validatePaginationQuery } from 'src/common/validators/pagination.validator';

@ApiTags('employees')          
@ApiBearerAuth()              
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post('add')
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'Employee created successfully' })
  create(@Body() createDto: CreateEmployeeDto) {
    return this.employeeService.create(createDto);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee updated successfully' })
  update(@Param() params: GetEmployeeDto, @Body() updateDto: UpdateEmployeeDto) {
    return this.employeeService.update(params.id, updateDto);
  }


@Get()//http://localhost:3000/employees?pagination=true&from=0&to=2&sortField=empNumber&sortOrder=desc
@ApiOperation({ summary: 'Get all employees with optional pagination' })
@ApiResponse({ status: 200, description: 'List of employees' })
@ApiResponse({ status: 400, description: 'Invalid query parameters' })

async getAll(@Query() query: PaginationQueryDto) {
  const { pagination, from, to, filter, sort} = validatePaginationQuery(
    query.pagination,query.from,query.to,query.search, query.searchField,
     query.op,query.sortField,query.sortOrder);
  return this.employeeService.getAll(pagination, from, to,filter, sort);
}


  @Get('id/:id')
  @ApiOperation({ summary: 'Get employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee found' })
  getById(@Param() params: GetEmployeeDto) {
    return this.employeeService.getById(params.id);
  }
  @Roles('admin', 'employee')
  @Get('empNumber/:empNumber')
  @ApiOperation({ summary: 'Get employee by employee number' })
  @ApiResponse({ status: 200, description: 'Employee found' })
  getByEmpNumber(@Param() params: GetEmployeeNumberDto, @Req() req) {
    return this.employeeService.getByEmpNumber(params.empNumber, req.user);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  remove(@Param() params: GetEmployeeDto) {
    return this.employeeService.remove(params.id);
  }

  @Post(':id/skills')
  @ApiOperation({ summary: 'Add a skill to an employee' })
  @ApiResponse({ status: 200, description: 'Skill added to employee successfully' })
  addSkill(@Param() params: GetEmployeeDto, @Body() body: AddSkillDto) {
    return this.employeeService.addSkillToEmployee(params.id, body.skillId);
  }
}
