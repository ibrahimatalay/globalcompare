import { Module } from '@nestjs/common';
import { WorldbankController } from './worldbank.controller';
import { WorldbankService } from './worldbank.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WorldbankController],
  providers: [WorldbankService]
})
export class WorldbankModule { }
