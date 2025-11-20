// import { 
//   Injectable, 
//   NotFoundException, 
//   ForbiddenException, 
//   BadRequestException 
// } from '@nestjs/common';

// import { DatabaseService } from 'src/database/database.service';
// import { v4 as uuid } from 'uuid';
// import { CreateEmployeeDto } from './dto/create-employee.dto';
// import { UpdateEmployeeDto } from './dto/update-employee.dto';
// import * as bcrypt from 'bcryptjs';
// import { SkillsService } from 'src/skills/skills.service';

// @Injectable()
// export class EmployeesService {
//   private readonly fileName = 'employees.json';

//   constructor(
//     private readonly db: DatabaseService,
//     private readonly skillsService: SkillsService
//   ) {}

//   async findByEmail(email: string) {
//     const employees = await this.db.readDb(this.fileName);
//     return employees.find(emp => emp.email === email);
//   }

//   async getAll() {
//     return this.db.readDb(this.fileName);
//   }

//   async getById(id: string) {
//     const employees = await this.db.readDb(this.fileName);
//     const employee = employees.find(emp => emp.id === id);

//     if (!employee) {
//       throw new NotFoundException('Employee not found');
//     }

//     return employee;
//   }

//   async getByEmpNumber(empNumber: string, user: any) {
//     const employees = await this.db.readDb(this.fileName);
//     const employee = employees.find(emp => emp.empNumber === empNumber);

//     if (!employee) {
//       throw new NotFoundException('Employee not found');
//     }

//     // Allow admin
//     if (user.role === 'admin') {
//       return employee;
//     }

//     // Allow user to access only their own data
//     if (user.empNumber === empNumber) {
//       return employee;
//     }

//     throw new ForbiddenException('You are not allowed to access this data');
//   }

//   async create(createDto: CreateEmployeeDto) {
//     const employees = await this.db.readDb(this.fileName);

//     if (employees.some(emp => emp.empNumber === createDto.empNumber)) {
//       throw new BadRequestException('Employee number must be unique');
//     }

//     if (employees.some(emp => emp.email === createDto.email)) {
//       throw new BadRequestException('Email must be unique');
//     }

//     const hashedPassword = await bcrypt.hash(createDto.password, 10);
//     const { password, ...rest } = createDto;

//     const newEmployee = {
//       id: uuid(),
//       ...rest,
//       password: hashedPassword,
//       engagementScore: 0,
//     };

//     employees.push(newEmployee);
//     await this.db.writeDb(this.fileName, employees);

//     return newEmployee;
//   }

//   async update(id: string, updateDto: UpdateEmployeeDto) {
//     const employees = await this.db.readDb(this.fileName);

//     const index = employees.findIndex(emp => emp.id === id);
//     if (index === -1) {
//       throw new NotFoundException('Employee not found');
//     }

//     if (
//       updateDto.empNumber &&
//       employees.some(emp => emp.empNumber === updateDto.empNumber && emp.id !== id)
//     ) {
//       throw new BadRequestException('Employee number must be unique');
//     }

//     if (
//       updateDto.email &&
//       employees.some(emp => emp.email === updateDto.email && emp.id !== id)
//     ) {
//       throw new BadRequestException('Email must be unique');
//     }

//     if (updateDto.password) {
//       updateDto.password = await bcrypt.hash(updateDto.password, 10);
//     }

//     employees[index] = { ...employees[index], ...updateDto };

//     await this.db.writeDb(this.fileName, employees);
//     return employees[index];
//   }

//   async remove(id: string) {
//     const employees = await this.db.readDb(this.fileName);
//     const index = employees.findIndex(emp => emp.id === id);

//     if (index === -1) {
//       throw new NotFoundException('Employee not found');
//     }

//     const [deleted] = employees.splice(index, 1);
//     await this.db.writeDb(this.fileName, employees);

//     return deleted;
//   }

//   async increaseEngagement(empNumber: string, points: number) {
//     const employees = await this.db.readDb(this.fileName);
//     const employee = employees.find(emp => emp.empNumber === empNumber);

//     if (!employee) {
//       throw new NotFoundException('Employee not found');
//     }

//     employee.engagementScore += points;
//     await this.db.writeDb(this.fileName, employees);

//     return employee;
//   }

//   async addSkillToEmployee(id: string, skillId: string) {
//     const employees = await this.db.readDb(this.fileName);
//     const employee = employees.find(emp => emp.id === id);

//     if (!employee) {
//       throw new NotFoundException('Employee not found');
//     }

//     const skill = await this.skillsService.getById(skillId);
//     if (!skill) {
//       throw new NotFoundException('Skill not found');
//     }

//     if (!Array.isArray(employee.skills)) {
//       employee.skills = [];
//     }

//     if (employee.skills.includes(skillId)) {
//       throw new BadRequestException('Skill already assigned to this employee');
//     }

//     employee.skills.push(skillId);
//     await this.db.writeDb(this.fileName, employees);

//     return employee;
//   }
// }


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

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<Employee>,

    @InjectModel(Skill.name)//Give me the Mongoose model for the Skill collection
    private skillModel: Model<Skill>,//This is a Mongoose model for Skill documents
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

  async increaseEngagement(empNumber: string, points: number) {
    const employee = await this.employeeModel.findOne({ empNumber }).exec();
    if (!employee) throw new NotFoundException('Employee not found');
    employee.engagementScore += points;
    await employee.save();
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
    //return employee;
    const updatedEmployee= await this.employeeModel.findById(id).populate('skills').exec();
    return updatedEmployee;
  }
}
