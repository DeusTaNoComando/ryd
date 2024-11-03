import { Request, Response } from 'express'
import { SortDirections } from '../dtos/pagination.dto'
import { CreatePumpDto, GetPumpDto, UpdatePumpDto } from '../dtos/pump.dto'
import PumpService from '../services/pump.service'

class PumpController {
    /**
     * Fetch all Pumps for a given POI with pagination and filtering
     */
    public async getPumpsByPOI(req: Request, res: Response) {
        const { poiId } = req.params

        const paginationDto: GetPumpDto = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 500,
            sort: (req.query.sort as SortDirections) || SortDirections.DESC, // Default to 'DESC' if not provided
            pumpName: (req.query.pumpName as string) || undefined,
        }

        try {
            const pumps = await PumpService.getPumpsByPOI(poiId, paginationDto)
            res.json(pumps)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    /**
     * Create a new Pump for a POI
     */
    public async createPump(req: Request, res: Response) {
        const data: CreatePumpDto = req.body
        const pump = await PumpService.createPump(req.params.poiId, data)
        res.status(201).json(pump)
    }

    /**
     * Update an existing Pump
     */
    public async updatePump(req: Request, res: Response) {
        const data: UpdatePumpDto = req.body
        const pump = await PumpService.updatePump(req.params.pumpId, data)
        if (pump) res.json(pump)
        else res.status(404).json({ message: 'Pump not found' })
    }

    /**
     * Delete a Pump
     */
    public async deletePump(req: Request, res: Response) {
        const pump = await PumpService.deletePump(req.params.pumpId)
        if (pump) res.json({ message: 'Pump deleted successfully' })
        else res.status(404).json({ message: 'Pump not found' })
    }
}

export default new PumpController()
