import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Indicator } from 'src/schemas/Indicator.schema';
import { Model } from 'mongoose';

@Injectable()
export class IndicatorService {
    constructor(@InjectModel(Indicator.name) private indicatorModel: Model<Indicator>) { }

    async getAll() {
        return await this.indicatorModel.find().exec();
    }
}
