/**
 * PaginatorFilteredDto
 * @packageDocumentation
 */
import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator'

/**
 * Sort directions, used to sort results.
 */
export enum SortDirections {
    ASC = 'ASC',
    DESC = 'DESC',
}

/**
 * Class PaginatorFilteredDto
 * DTO for helping creating DTO with pagination and simple filtered criteria
 */
export class PaginationDto {
    /**
     * @var number page     Page requested
     */
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page?: number = 1

    /**
     * @var number limit    The number of fields that will be returned per page
     */
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit?: number = 500

    /**
     * @var string order Sort column - Ascendent or Descendent
     */
    @IsOptional()
    @IsEnum(SortDirections)
    sort?: SortDirections = SortDirections.DESC
}
