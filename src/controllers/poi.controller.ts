import { Request, Response } from 'express'
import { SortDirections } from '../dtos/pagination.dto'
import { CreatePOIDto, GetPOIDto, UpdatePOIDto } from '../dtos/poi.dto'
import { POIOpeningHours, POIStatus } from '../enums/poi.enums'
import POIService from '../services/poi.service'

class POIController {
    /**
     * Get all POIs with pagination and filtering
     */
    public async getAllPOIs(req: Request, res: Response) {
        try {
            // Extract pagination and filtering parameters from the request query
            const paginationDto: GetPOIDto = {
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 500,
                status: (req.query.status as POIStatus) || undefined,
                openingHours:
                    (req.query.openingHours as POIOpeningHours) || undefined,
                sort: (req.query.sort as SortDirections) || SortDirections.DESC, // Default to 'DESC' if not provided
            }
            console.log(paginationDto)
            const pois = await POIService.getAllPOIs(paginationDto)
            res.json(pois)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    /**
     * Get POI by ID
     */
    public async getPOIById(req: Request, res: Response) {
        const poi = await POIService.getPOIById(req.params.id)
        if (poi) res.json(poi)
        else res.status(404).json({ message: 'POI not found' })
    }

    /**
     * Create a new POI
     */
    public async createPOI(req: Request, res: Response) {
        const data: CreatePOIDto = req.body
        const poi = await POIService.createPOI(data)
        res.status(201).json(poi)
    }

    /**
     * Update an existing POI
     */
    public async updatePOI(req: Request, res: Response) {
        const data: UpdatePOIDto = req.body
        const poi = await POIService.updatePOI(req.params.id, data)
        if (poi) res.json(poi)
        else res.status(404).json({ message: 'POI not found' })
    }

    /**
     * Delete a POI
     */
    public async deletePOI(req: Request, res: Response) {
        const poi = await POIService.deletePOI(req.params.id)
        if (poi) res.json({ message: 'POI deleted successfully' })
        else res.status(404).json({ message: 'POI not found' })
    }
}

export default new POIController()
