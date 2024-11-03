import { Router } from 'express'
import PumpController from '../controllers/pump.controller'
import {
    validateCreatePump,
    validateUpdatePump,
} from '../middlewares/pump.middleware'

const router = Router()

/**
 * Route to fetch all Pumps for a given POI with pagination and filtering
 */
router.get('/:poiId/pumps', PumpController.getPumpsByPOI)

/**
 * Route to create a new Pump for a POI
 */
router.post('/:poiId/pumps', validateCreatePump, PumpController.createPump)

/**
 * Route to update an existing Pump
 */
router.put('/pumps/:pumpId', validateUpdatePump, PumpController.updatePump)

/**
 * Route to delete a Pump
 */
router.delete('/pumps/:pumpId', PumpController.deletePump)

export default router
