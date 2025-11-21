import { Injectable } from '@nestjs/common';
import { Employee } from 'src/employees/schemas/employee.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeesService } from 'src/employees/employees.service';
import { Inject, forwardRef } from '@nestjs/common';


@Injectable()
export class AnalyticsService {
   constructor(
  @Inject(forwardRef(() => EmployeesService))
  private readonly employeeService: EmployeesService
) {}

   async calculateEngagementScore(id:string):Promise<number>{
      const employee=await this.employeeService.getById(id);
      //(e.g., (Number of skills * 10) + (Number of years since hire date * 5)).
      const currentDate=new Date();
      const hireDate=new Date(employee.hireDate);
      const yearsOfService=currentDate.getFullYear()-hireDate.getFullYear();
      const numberOfSkills=employee.skills.length;
      const engagementScore=(numberOfSkills*10)+(yearsOfService*5);
      return engagementScore; 
   }


}