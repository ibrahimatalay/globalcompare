import { IsString } from "class-validator";

export class IndicatorResponseDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    description: string;
}