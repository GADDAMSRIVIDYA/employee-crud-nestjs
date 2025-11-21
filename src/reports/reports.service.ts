import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../employees/schemas/employee.schema';
import { Skill } from '../skills/schemas/skill.schema';

@Injectable()
export class ReportsService {
    constructor(//@InjectModel(Employee.name) private employeeModel:Model<Employee>,
    @InjectModel(Skill.name) private skillModel:Model<Skill>)
    {}
    // async getSkillPopularity(){
    //     return this.employeeModel.aggregate([
    //         {$unwind:"$skills"},
    //         {
    //             $group:{
    //                 _id:"$skills",
    //                 employeeCount:{"$sum":1}
    //             }
    //         },
    //         {$sort:{employeeCount:-1}}
            
    //     ])


    // }
//     async getSkillPopularity() {
//   return this.employeeModel.aggregate([
//     { $unwind: "$skills" },
//     { $sortByCount: "$skills" } , 
//     {$project:{
//         _id:1,
//         employeeCount:"$count"
//     }}
    
//   ]);
// }


async getSkillPopularity() {
  return this.skillModel.aggregate([
    
    { $lookup: 
      {
        from: "employees",
        localField: "_id",
        foreignField: "skills",
        as: "employeesWithSkills"
      }
  },
  {
    $project: {
      
      _id: 1,
      name: 1,
      description: 1,
      employeeCount: {
        $size: {
          $ifNull: ["$employeesWithSkills", []]
        }
      }
    }
  }  
  ]);
}


}
