import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
//import { DatabaseService } from 'src/database/database.service';
//import { v4 as uuid } from 'uuid';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Skill} from './schemas/skill.schema';

@Injectable()
export class SkillsService {
  //private readonly fileName = 'skills.json';

  constructor(//private readonly db: DatabaseService
    @InjectModel(Skill.name)
    private skillModel: Model<Skill>,
    
  ) {}

  async getAll() {
    return this.skillModel.find().exec();
  }

  async getById(id: string) {
    const skills = await this.skillModel.findById(id).exec();
    if (!skills) throw new NotFoundException('Skill not found');
    return skills;
  }

  async create(createDto: CreateSkillDto) {
    const name= await this.skillModel.findOne({name:createDto.name}).exec();
    if(name){
      throw new BadRequestException('name must be unique');
    };
    const newSkill = { ...createDto };
    //skill.push(newSkill);
    return this.skillModel.create(newSkill);
  }

  async update(id: string, updateDto: UpdateSkillDto) {
    const skill = await this.skillModel.findById(id).exec();
    if(!skill){throw new NotFoundException('Skill not found');}
    if (updateDto.name) {
      const existing = await this.skillModel.findOne({
        name: updateDto.name,
        _id: { $ne: id },
      }).exec();
      if (existing) throw new BadRequestException('name must be unique');
    }

    return this.skillModel.findByIdAndUpdate(id,updateDto,{new:true}).exec();
  }

  async remove(id: string) {
    const skill = await this.skillModel.findByIdAndDelete(id).exec();
    if(!skill){
      throw new NotFoundException('skill not found');
    }
    return skill;
  }
}
