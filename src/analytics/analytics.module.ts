import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { EmployeesModule } from 'src/employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose';
//import { Employee, EmployeeSchema } from 'src/employees/schemas/employee.schema';
import { forwardRef } from '@nestjs/common';

@Module({
  imports:[forwardRef(() => EmployeesModule),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
