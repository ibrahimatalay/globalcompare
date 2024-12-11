import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './country.schema';
import { CountryService } from './country.service';
import { HttpModule } from '@nestjs/axios';
import { CountryController } from './country.controller';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([{
            name: Country.name,
            schema: CountrySchema
        }])
    ],
    providers: [CountryService],
    controllers: [CountryController],
})
export class CountryModule { }
