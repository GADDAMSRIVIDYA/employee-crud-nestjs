import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Employee } from './schemas/employee.schema';
import { Skill } from 'src/skills/schemas/skill.schema';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  constructor(
  @InjectModel(Employee.name)
  private readonly employeeModel: Model<Employee>,

  @InjectModel(Skill.name)
  private readonly skillModel: Model<Skill>,

  @Inject(forwardRef(() => AnalyticsService))
  private readonly analyticsService: AnalyticsService,
) {}

  async findByEmail(email: string) {
    return this.employeeModel.findOne({ email }).exec();
  }

  async getAll() {
    return this.employeeModel.find().exec();
  }

  async getById(id: string) {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async getByEmpNumber(empNumber: string, user: any) {
    const employee = await this.employeeModel.findOne({ empNumber }).exec();
    if (!employee) throw new NotFoundException('Employee not found');
    if (user.role === 'admin') return employee;
    if (user.empNumber === empNumber) return employee;
    throw new ForbiddenException('You are not allowed to access this data');
  }

  async create(dto: CreateEmployeeDto) {
    if (await this.employeeModel.findOne({ email: dto.email }))
      throw new BadRequestException('Email must be unique');

    if (await this.employeeModel.findOne({ empNumber: dto.empNumber }))
      throw new BadRequestException('Employee number must be unique');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.employeeModel.create({
      ...dto,
      password: hashedPassword,
      engagementScore: 0,
    });
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    const employee = await this.employeeModel.findById(id);
    if (!employee) throw new NotFoundException('Employee not found');

    if (dto.empNumber) {
      const existing = await this.employeeModel.findOne({
        empNumber: dto.empNumber,
        _id: { $ne: id },
      });
      if (existing) throw new BadRequestException('Employee number must be unique');
    }

    if (dto.email) {
      const existing = await this.employeeModel.findOne({
        email: dto.email,
        _id: { $ne: id },
      });
      if (existing) throw new BadRequestException('Email must be unique');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    return this.employeeModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string) {
    const employee = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async addSkillToEmployee(id: string, skillId: string) {
    const employee = await this.employeeModel.findById(id).populate('skills').exec();
    if (!employee) throw new NotFoundException('Employee not found');

    const skill = await this.skillModel.findById(skillId);
    if (!skill) throw new NotFoundException('Skill not found');

    if (!Array.isArray(employee.skills)) employee.skills = [];

    if (employee.skills.some(s => s.toString() === skillId)) {
     throw new BadRequestException('Skill already assigned to this employee');
    }

    employee.skills.push(new Types.ObjectId(skillId));
    await employee.save();

    const  newscore = await this.analyticsService.calculateEngagementScore(id); 
    employee.engagementScore = newscore;
    await  employee.save();

    const updatedEmployee= await this.employeeModel.findById(id).populate('skills').exec();
    return updatedEmployee;
  }
}
