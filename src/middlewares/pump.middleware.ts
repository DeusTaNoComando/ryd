import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { CreatePumpDto, UpdatePumpDto } from '../dtos/pump.dto' // Adjust the import path as necessary

export const validateCreatePump = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const createPumpDto = plainToClass(CreatePumpDto, req.body) // Convert plain object to class instance

    const errors = await validate(createPumpDto) // Validate the instance

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

export const validateUpdatePump = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const updatePumpDto = plainToClass(UpdatePumpDto, req.body) // Convert plain object to class instance

    const errors = await validate(updatePumpDto) // Validate the instance

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
