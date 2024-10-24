import { IsString } from "class-validator";

export class CountryResponseDto {
    @IsString()
    id: string;

    @IsString()
    name: string;
}