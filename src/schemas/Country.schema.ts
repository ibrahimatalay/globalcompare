import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Country extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);