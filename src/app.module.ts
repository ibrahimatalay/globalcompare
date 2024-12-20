import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CountryModule } from './country/country.module';
import { IndicatorModule } from './indicator/indicator.module';
import { WorldbankModule } from './worldbank/worldbank.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    CountryModule,
    IndicatorModule,
    WorldbankModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }