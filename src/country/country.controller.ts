import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResponseDto } from './dto/country-response.dto';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @Get('all')
    async getAll(): Promise<CountryResponseDto[]> {
        const countries = await this.countryService.getAll();
        return countries.map(country => ({
            id: country.id,
            name: country.name,
        }));
    }
}