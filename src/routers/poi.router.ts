import { Router } from 'express'
import POIController from '../controllers/poi.controller'
import {
    validateCreatePOI,
    validateUpdatePOI,
} from '../middlewares/poi.middleware'

const router = Router()

/**
 * Route to get all  with pagination and filtering
 */
router.get(
    '/',
    (req, res, next) => {
        console.log('GET /api/pois') // Log for debugging
        next()
    },
    POIController.getAllPOIs,
)

/**
 * Route to get a specific POI by ID
 */
router.get('/:id', POIController.getPOIById)

/**
 * Route to create a new POI
 */
router.post('/', validateCreatePOI, POIController.createPOI)

/**
 * Route to update an existing POI
 */
router.put('/:id', validateUpdatePOI, POIController.updatePOI)

/**
 * Route to delete a POI
 */
router.delete('/:id', POIController.deletePOI)

export default router
