// src/services/poi.service.ts

import { AppDataSource } from '../db/dbConfig'
import { CreatePOIDto, GetPOIDto, UpdatePOIDto } from '../dtos/poi.dto'
import { POI } from '../entities/poi.entity'
import { Pump } from '../entities/pump.entity'
import { PaginationMeta } from '../interfaces/pagination.interfaces'

class POIService {
    private poiRepository = AppDataSource.getRepository(POI)
    private pumpRepository = AppDataSource.getRepository(Pump)

    public async getAllPOIs(
        paginationDto: GetPOIDto,
    ): Promise<{ data: POI[]; meta: PaginationMeta }> {
        const { page, limit, sort, status, openingHours } = paginationDto

        // Calculate pagination offsets
        const offset = (page - 1) * limit

        // Build the query with filters
        const queryBuilder = this.poiRepository
            .createQueryBuilder('poi')
            .leftJoinAndSelect('poi.pumps', 'pump')
            .skip(offset)
            .take(limit)

        if (status) {
            queryBuilder.where('poi.status = :status', { status })
        }
        if (openingHours) {
            queryBuilder.andWhere(
                'poi.openingHoursPattern LIKE :openingHours',
                { openingHours: `%${openingHours}%` },
            )
        }

        if (sort) {
            queryBuilder.orderBy('poi.createdAt', sort) // Adjust field as necessary for sorting
        }

        const [results, total] = await queryBuilder.getManyAndCount()

        const totalPages = Math.ceil(total / limit)

        return {
            data: results,
            meta: {
                page,
                total_pages: totalPages,
                limit,
                total_resources: total,
            },
        }
    }

    /**
     * Fetch a POI by ID
     */
    public async getPOIById(id: string): Promise<POI | null> {
        try {
            return await this.poiRepository.findOne({
                where: { id },
                relations: ['pumps'],
            })
        } catch (error) {
            throw new Error(`Failed to retrieve POI with id ${id}`)
        }
    }

    /**
     * Create a new POI
     */
    public async createPOI(data: CreatePOIDto): Promise<POI> {
        try {
            const poi = this.poiRepository.create({
                status: data.status,
                address: data.address,
                openingHoursPattern: data.openingHours,
            })

            // Map DTO pumps to Pump entities
            poi.pumps = data.pumps.map((pumpData) => {
                return this.pumpRepository.create({
                    // Only include properties that exist on the Pump entity
                    pumpName: pumpData.pumpName,
                    fuelProducts: pumpData.fuelProducts.map((product) => ({
                        // Adjusting to match the expected FuelProduct structure
                        name: product.name,
                        price: {
                            [product.currency]: product.price, // Assuming price is keyed by currency
                        },
                    })),
                })
            })

            // Save the POI entity, which will cascade and save Pump entities if set up properly
            return await this.poiRepository.save(poi)
        } catch (error) {
            console.error('Error creating POI:', error)
            throw new Error('Failed to create POI')
        }
    }

    /**
     * Update an existing POI by ID
     */
    public async updatePOI(
        id: string,
        data: UpdatePOIDto,
    ): Promise<POI | null> {
        try {
            // Fetch the existing POI to ensure we have the latest data
            const existingPOI = await this.poiRepository.findOne({
                where: { id },
                relations: ['pumps'],
            })

            if (!existingPOI) {
                throw new Error(`POI with id ${id} not found`)
            }

            // Update the POI's basic properties
            existingPOI.status = data.status ?? existingPOI.status // Use existing value if not provided
            existingPOI.address = { ...existingPOI.address, ...data.address } // Merge existing address with new data
            existingPOI.openingHoursPattern =
                data.openingHours ?? existingPOI.openingHoursPattern

            // Update pumps if provided
            if (data.pumps) {
                // You can implement logic here to either replace or update existing pumps
                existingPOI.pumps = data.pumps.map((pumpData) => {
                    const pump = this.pumpRepository.create({
                        pumpName: pumpData.pumpName,
                        fuelProducts: pumpData.fuelProducts.map((product) => ({
                            name: product.name,
                            price: {
                                [product.currency]: product.price,
                            },
                        })),
                    })
                    return pump
                })
            }

            // Save the updated POI
            await this.poiRepository.save(existingPOI)
            return existingPOI
        } catch (error) {
            console.error('Error updating POI:', error)
            throw new Error(`Failed to update POI with id ${id}`)
        }
    }

    /**
     * Delete a POI by ID
     */
    public async deletePOI(id: string): Promise<POI | null> {
        try {
            const poi = await this.getPOIById(id)
            if (!poi) return null
            await this.poiRepository.remove(poi)
            return poi
        } catch (error) {
            throw new Error(`Failed to delete POI with id ${id}`)
        }
    }
}

export default new POIService()
