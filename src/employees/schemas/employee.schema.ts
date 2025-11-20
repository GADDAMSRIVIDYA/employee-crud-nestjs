import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { Skill } from '../../skills/schemas/skill.schema';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true, unique: true })
  empNumber: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  hireDate: string; 
  

  @Prop({ type: [Types.ObjectId],ref:Skill.name,default: [] })
   skills: Types.ObjectId[];

  @Prop({ required: true, enum: ['admin', 'employee'] })
  role: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  engagementScore: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
