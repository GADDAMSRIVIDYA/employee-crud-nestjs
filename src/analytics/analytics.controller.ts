// import { Controller ,Get,Param} from '@nestjs/common';
// import { AnalyticsService } from './analytics.service';
// import { getEmployeeDto } from 'src/employees/dto/get-employee-id.Dto';
// @Controller('analytics')
// export class AnalyticsController {
//   constructor(private readonly analyticsService: AnalyticsService) {}
//  // GET /analytics/employee/:id/score
//  @Get('employee/:id/score')
//     async getEngagementScore(@Param() params:getEmployeeDto) {
//         return this.analyticsService.calculateEngagementScore(params.id);
//     }
// }



import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { GetEmployeeDto } from 'src/employees/dto/get-employee-id.Dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  
  @Get('employee/:id/score')
  @ApiOperation({ summary: 'Get engagement score for an employee by ID' })
  @ApiResponse({ status: 200, description: 'Engagement score calculated successfully' })
  getEngagementScore(@Param() params: GetEmployeeDto) {
    return this.analyticsService.calculateEngagementScore(params.id);
  }
}
