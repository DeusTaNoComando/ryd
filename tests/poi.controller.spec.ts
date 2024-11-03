import { Request, Response } from 'express'
import 'reflect-metadata'
import POIController from '../src/controllers/poi.controller'
import { SortDirections } from '../src/dtos/pagination.dto'
import { POIStatus } from '../src/enums/poi.enums'
import POIService from '../src/services/poi.service'

jest.mock('../src/services/poi.service') // Mock the POIService

describe('POIController', () => {
    let req: Partial<Request>
    let res: Partial<Response>

    beforeEach(() => {
        req = {
            params: {},
            query: {},
            body: {},
        }
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        }
    })

    it('should fetch all POIs with pagination and filtering', async () => {
        req.query = { page: '1', limit: '10', status: POIStatus.ONLINE }
        POIService.getAllPOIs = jest
            .fn()
            .mockResolvedValue([{ id: '1' }, { id: '2' }])

        await POIController.getAllPOIs(req as Request, res as Response)

        expect(res.json).toHaveBeenCalledWith([{ id: '1' }, { id: '2' }])
        expect(POIService.getAllPOIs).toHaveBeenCalledWith({
            page: 1,
            limit: 10,
            status: POIStatus.ONLINE,
            sort: SortDirections.DESC,
        })
    })

    it('should get a POI by ID', async () => {
        req.params = { id: '1' }
        POIService.getPOIById = jest.fn().mockResolvedValue({ id: '1' })

        await POIController.getPOIById(req as Request, res as Response)

        expect(res.json).toHaveBeenCalledWith({ id: '1' })
    })

    it('should return 404 if POI not found', async () => {
        req.params = { id: '1' }
        POIService.getPOIById = jest.fn().mockResolvedValue(null)

        await POIController.getPOIById(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ message: 'POI not found' })
    })

    it('should create a new POI', async () => {
        req.body = { status: POIStatus.ONLINE, address: {}, openingHours: {} }
        POIService.createPOI = jest.fn().mockResolvedValue({ id: '1' })

        await POIController.createPOI(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ id: '1' })
    })

    it('should update an existing POI', async () => {
        req.params = { id: '1' }
        req.body = { status: POIStatus.OFFLINE }
        POIService.updatePOI = jest.fn().mockResolvedValue({ id: '1' })

        await POIController.updatePOI(req as Request, res as Response)

        expect(res.json).toHaveBeenCalledWith({ id: '1' })
    })

    it('should return 404 when updating a non-existent POI', async () => {
        req.params = { id: '1' }
        req.body = { status: POIStatus.OFFLINE }
        POIService.updatePOI = jest.fn().mockResolvedValue(null)

        await POIController.updatePOI(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ message: 'POI not found' })
    })

    it('should delete a POI', async () => {
        req.params = { id: '1' }
        POIService.deletePOI = jest.fn().mockResolvedValue(true)

        await POIController.deletePOI(req as Request, res as Response)

        expect(res.json).toHaveBeenCalledWith({
            message: 'POI deleted successfully',
        })
    })

    it('should return 404 when deleting a non-existent POI', async () => {
        req.params = { id: '1' }
        POIService.deletePOI = jest.fn().mockResolvedValue(false)

        await POIController.deletePOI(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ message: 'POI not found' })
    })
})
