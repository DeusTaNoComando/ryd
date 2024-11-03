import { Request, Response } from 'express'
import 'reflect-metadata'
import PumpController from '../src/controllers/pump.controller'
import PumpService from '../src/services/pump.service'

jest.mock('../src/services/pump.service') // Mock the PumpService

describe('PumpController', () => {
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

    it('should fetch all Pumps for a given POI with pagination and filtering', async () => {
        req.params = { poiId: '1' }
        req.query = { page: '1', limit: '10', pumpName: 'Pump1' }
        PumpService.getPumpsByPOI = jest
            .fn()
            .mockResolvedValue([{ pumpId: '1' }, { pumpId: '2' }])

        await PumpController.getPumpsByPOI(req as Request, res as Response)

        expect(res.json).toHaveBeenCalledWith([
            { pumpId: '1' },
            { pumpId: '2' },
        ])
        expect(PumpService.getPumpsByPOI).toHaveBeenCalledWith('1', {
            page: 1,
            limit: 10,
            sort: expect.anything(),
            pumpName: 'Pump1',
        })
    })

    it('should create a new Pump for a POI', async () => {
        req.params = { poiId: '1' }
        req.body = { pumpName: 'Pump1' }
        PumpService.createPump = jest.fn().mockResolvedValue({ pumpId: '1' })

        await PumpController.createPump(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ pumpId: '1' })
    })

    it('should update an existing Pump', async () => {
        req.params = { pumpId: '1' }
        req.body = { pumpName: 'UpdatedPump' }
        PumpService.updatePump = jest.fn().mockResolvedValue({ pumpId: '1' })

        await PumpController.updatePump(req as Request, res as Response)

        expect(res.json).toHaveBeenCalledWith({ pumpId: '1' })
    })

    it('should return 404 when updating a non-existent Pump', async () => {
        req.params = { pumpId: '1' }
        req.body = { pumpName: 'UpdatedPump' }
        PumpService.updatePump = jest.fn().mockResolvedValue(null)

        await PumpController.updatePump(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ message: 'Pump not found' })
    })

    it('should delete a Pump', async () => {
        req.params = { pumpId: '1' }
        PumpService.deletePump = jest.fn().mockResolvedValue(true)

        await PumpController.deletePump(req as Request, res as Response)

        expect(res.json).toHaveBeenCalledWith({
            message: 'Pump deleted successfully',
        })
    })

    it('should return 404 when deleting a non-existent Pump', async () => {
        req.params = { pumpId: '1' }
        PumpService.deletePump = jest.fn().mockResolvedValue(false)

        await PumpController.deletePump(req as Request, res as Response)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ message: 'Pump not found' })
    })
})
