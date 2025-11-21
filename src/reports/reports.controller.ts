import { Controller ,Get} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Roles } from 'src/auth/decorators/roles.decorators';


@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}
    @Roles('admin')
    @Get('skill-popularity')
    async getSkillPopularity(){
        return this.reportsService.getSkillPopularity();
    }


}
