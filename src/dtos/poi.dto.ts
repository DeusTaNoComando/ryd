import { Type } from 'class-transformer'
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'
import { POIOpeningHours, POIStatus } from '../enums/poi.enums'
import { PaginationDto } from './pagination.dto'
import { CreatePumpDto } from './pump.dto'

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    country: string

    @IsString()
    @IsNotEmpty()
    zipCode: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    street: string

    @IsString()
    @IsNotEmpty()
    houseNumber: string
}

export class GetPOIDto extends PaginationDto {
    @IsOptional()
    @IsEnum(POIStatus)
    status?: POIStatus

    @IsOptional()
    @IsEnum(POIOpeningHours)
    openingHours?: POIOpeningHours
}

export class CreatePOIDto {
    @IsEnum(POIStatus)
    status: POIStatus

    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto

    @IsEnum(POIOpeningHours)
    openingHours: POIOpeningHours

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePumpDto)
    pumps: CreatePumpDto[]
}

export class UpdatePOIDto {
    @IsOptional()
    @IsEnum(POIStatus)
    status?: POIStatus

    @IsOptional()
    @ValidateNested()
    @Type(() => AddressDto)
    address?: AddressDto

    @IsOptional()
    @IsEnum(POIOpeningHours)
    openingHours?: POIOpeningHours

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePumpDto)
    pumps?: CreatePumpDto[]
}
