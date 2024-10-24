import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'indicator' })
export class Indicator {
    @Prop({ unique: true, required: true })
    id: string;

    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ required: true })
    description: string;
}

export const IndicatorSchema = SchemaFactory.createForClass(Indicator);