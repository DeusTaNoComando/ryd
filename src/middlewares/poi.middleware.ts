import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { CreatePOIDto, UpdatePOIDto } from '../dtos/poi.dto'

export const validateCreatePOI = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const dtoObject = plainToInstance(CreatePOIDto, req.body) // Transform plain object to DTO instance

    const errors = await validate(dtoObject) // Validate the DTO instance

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.map((error) => ({
                property: error.property,
                constraints: error.constraints,
            })),
        })
    }

    next() // Proceed to the next middleware/controller if validation is successful
}

export const validateUpdatePOI = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const updatePOIDto = plainToInstance(UpdatePOIDto, req.body) // Convert plain object to class instance

    const errors = await validate(updatePOIDto) // Validate the instance

    if (errors.length > 0) {
        // If there are validation errors, return a 400 response
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.map((error) => ({
                property: error.property,
                constraints: error.constraints,
            })),
        })
    }

    // If validation passes, call the next middleware/handler
    next()
}
