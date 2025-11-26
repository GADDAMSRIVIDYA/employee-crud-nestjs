import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from '../skills/schemas/skill.schema';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async getSkillPopularity(pagination?: boolean,from: number = 0,to: number = 10) {
    const skillsAggregate = [
      {
        $lookup: {
          from: 'employees',
          localField: '_id',
          foreignField: 'skills',
          as: 'employeesWithSkills',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          employeeCount: {
            $size: { $ifNull: ["$employeesWithSkills", []]}
          },
        },
      },
      {
        $facet: {
          total: [{ $count: 'count' }],
          data: pagination
            ? [
                { $skip: from },
                { $limit: to - from },
              ]
            : [{ $match: {} }],
        },
      },
    ];

    const result = await this.skillModel.aggregate(skillsAggregate);
    return {
      total: result[0].total[0]?.count || 0,
      data: result[0].data,
    };
  }
}
