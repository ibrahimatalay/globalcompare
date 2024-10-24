import { IsOptional, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class WorldbankQueryDto {
    @IsOptional()
    @IsArray()
    @Type(() => String)
    country?: string[];
  
    @IsOptional()
    @IsString()
    indicator?: string;
}