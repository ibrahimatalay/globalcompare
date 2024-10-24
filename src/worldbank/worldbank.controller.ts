import { Controller, Get, Query } from '@nestjs/common';
import { WorldbankService } from './worldbank.service';
import { WorldbankQueryDto } from './dto/worldbank-query.dto';

@Controller('worldbank')
export class WorldbankController {
    constructor(private readonly worldbankService: WorldbankService) {}

    @Get('query')
    fetchFromWB(@Query() query: WorldbankQueryDto) {
        const { country, indicator } = query;
        return this.worldbankService.fetchFromWB(country, indicator);
    }
}
