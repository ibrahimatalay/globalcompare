import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from 'src/schemas/Country.schema';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountryService {
    constructor(
        @InjectModel(Country.name) private countryModel: Model<Country>,
        private readonly httpService: HttpService,
    ) { }

    @Cron('0 0 * * *')
    async fetchCountries() {
        console.log('Fetching countries at midnight');
        try {
            const response = await firstValueFrom(this.httpService.get('https://api.worldbank.org/v2/country?format=json&per_page=300'));
            const validCountries = response.data[1].filter((country: { region: { value: string; }; capitalCity: string; id: string; name: string; }) => {
                return country.region.value !== 'Aggregates'
                    && country.capitalCity !== ''
                    && country.id
                    && country.name;
            });

            const updatePromises = validCountries.map((country: { id: string; name: string; }) => {
                const { id, name } = country;
                return this.countryModel.findOneAndUpdate(
                    { id },
                    { name },
                    { upsert: true, new: true }
                );
            });

            await Promise.all(updatePromises);

            console.log('Countries successfully fetched and updated');
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }


    async getAll() {
        return this.countryModel.find().exec();
    }
}
