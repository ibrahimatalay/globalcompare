import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
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

    @Get(':id')
    async getById(@Param('id') id: string): Promise<IndicatorResponseDto> {
        const indicator = await this.indicatorService.getById(id);
        if (!indicator) throw new NotFoundException(`Indicator with ID ${id} not found`);

        return {
            id: indicator.id,
            name: indicator.name,
            description: indicator.description,
        };
    }
}
