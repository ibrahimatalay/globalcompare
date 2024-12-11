import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Indicator } from './indicator.schema';
import { Model } from 'mongoose';

@Injectable()
export class IndicatorService {
    constructor(@InjectModel(Indicator.name) private indicatorModel: Model<Indicator>) { }

    async getAll() {
        return await this.indicatorModel.find().exec();
    }

    async getById(id: string): Promise<Indicator | null> {
        return await this.indicatorModel.findOne({ id }).exec();
    }
}