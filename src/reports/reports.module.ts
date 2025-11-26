import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MongooseModule } from '@nestjs/mongoose';
//import { Report, ReportSchema } from './schemas/report.schema';
import { Employee, EmployeeSchema } from '../employees/schemas/employee.schema';
import { Skill, SkillSchema } from '../skills/schemas/skill.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Skill.name,schema:SkillSchema}])
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
