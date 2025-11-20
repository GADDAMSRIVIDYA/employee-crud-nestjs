import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
//import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import {Skill,SkillSchema} from './schemas/skill.schema';

@Module({
  imports:[
  // DatabaseModule
     MongooseModule.forFeature([
  {name:Skill.name,schema:SkillSchema}]
     )],

  controllers: [SkillsController],
  providers: [SkillsService],
  exports:[SkillsService]
})
export class SkillsModule {}
