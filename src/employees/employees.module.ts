import { Module, forwardRef } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
//import { DatabaseModule } from 'src/database/database.module';
import { SkillsModule } from 'src/skills/skills.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { Skill, SkillSchema } from 'src/skills/schemas/skill.schema';

@Module({
  imports: [//registering Mongoose models in a module
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }])
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}

