import { Controller ,Get,Param} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { getEmployeeDto } from 'src/employees/dto/get-employee-id.Dto';
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}
 // GET /analytics/employee/:id/score
 @Get('employee/:id/score')
    async getEngagementScore(@Param() params:getEmployeeDto) {
        return this.analyticsService.calculateEngagementScore(params.id);
    }
}
