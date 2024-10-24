import { Controller, Get } from '@nestjs/common';
import { IndicatorService } from './indicator.service';
import { IndicatorResponseDto } from './dto/indicator-response.dto';

@Controller('indicator')
export class IndicatorController {
    constructor(private readonly indicatorService: IndicatorService) { }

    @Get('all')
    async getAll(): Promise<IndicatorResponseDto[]> {
        const indicators = await this.indicatorService.getAll();
        return indicators.map(indicator => ({
            id: indicator.id,
            name: indicator.name,
            description: indicator.description,
        }));
    }
}
