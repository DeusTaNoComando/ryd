// src/dtos/pump.dto.ts

import { Type } from 'class-transformer'
import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator'
import { PaginationDto } from './pagination.dto'

class FuelProductDto {
    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsString()
    currency: string
}

export class GetPumpDto extends PaginationDto {
    @IsOptional()
    @IsString()
    pumpName?: string

    @IsOptional()
    @IsString()
    fuelType?: string
}

export class CreatePumpDto {
    @IsUUID()
    pumpId: string

    @IsString()
    pumpName: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FuelProductDto)
    fuelProducts: FuelProductDto[]
}

export class UpdatePumpDto {
    @IsOptional()
    @IsString()
    pumpName?: string

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FuelProductDto)
    fuelProducts?: FuelProductDto[]
}
