import { Module } from '@nestjs/common';
import { IndicatorController } from './indicator.controller';
import { IndicatorService } from './indicator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Indicator, IndicatorSchema } from './indicator.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{
          name: Indicator.name,
          schema: IndicatorSchema
      }])
  ],
  controllers: [IndicatorController],
  providers: [IndicatorService]
})
export class IndicatorModule {}
