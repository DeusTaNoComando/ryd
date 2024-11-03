// src/services/pump.service.ts

import { AppDataSource } from '../db/dbConfig'
import { CreatePumpDto, GetPumpDto, UpdatePumpDto } from '../dtos/pump.dto'
import { Pump } from '../entities/pump.entity'
import { PaginationMeta } from '../interfaces/pagination.interfaces'

class PumpService {
    private pumpRepository = AppDataSource.getRepository(Pump)

    /**
     * Fetch all Pumps for a given POI with pagination and filtering
     */
    public async getPumpsByPOI(
        poiId: string,
        paginationDto: GetPumpDto,
    ): Promise<{ data: Pump[]; meta: PaginationMeta }> {
        const { page, limit, pumpName } = paginationDto

        // Calculate the offset for pagination
        const offset = (page - 1) * limit

        // Build the query with filters
        const queryBuilder = this.pumpRepository
            .createQueryBuilder('pump')
            .where('pump.poiId = :poiId', { poiId })
            .skip(offset)
            .take(limit)

        // Apply filters if provided
        if (pumpName) {
            queryBuilder.andWhere('pump.pumpName LIKE :pumpName', {
                pumpName: `%${pumpName}%`,
            })
        }

        // Execute the query to get results and total count
        const [results, total] = await queryBuilder.getManyAndCount()

        // Calculate the total number of pages
        const totalPages = Math.ceil(total / limit)

        // Create the pagination meta
        const meta: PaginationMeta = {
            page,
            total_pages: totalPages,
            limit,
            total_resources: total,
        }

        return {
            data: results,
            meta,
        }
    }

    /**
     * Create a new Pump for a POI
     */
    public async createPump(poiId: string, data: CreatePumpDto): Promise<Pump> {
        try {
            // Map the fuel products to the expected structure
            const fuelProducts = data.fuelProducts.map((product) => ({
                name: product.name,
                price: { [product.currency]: product.price }, // Ensure price is structured correctly
            }))

            // Create the pump entity
            const pump = this.pumpRepository.create({
                pumpId: data.pumpId,
                pumpName: data.pumpName,
                fuelProducts: fuelProducts,
                poi: { id: poiId }, // Assuming this references the POI entity correctly
            })

            // Save the pump
            return await this.pumpRepository.save(pump)
        } catch (error) {
            console.error('Error creating pump:', error)
            throw new Error(`Failed to create pump for POI with id ${poiId}`)
        }
    }

    /**
     * Update an existing Pump by ID
     */
    public async updatePump(
        id: string,
        data: UpdatePumpDto,
    ): Promise<Pump | null> {
        try {
            // Retrieve the existing pump to preserve the original structure
            const existingPump = await this.pumpRepository.findOne({
                where: { pumpId: id },
            })
            if (!existingPump) {
                throw new Error(`Pump with id ${id} not found`)
            }

            // Update the existing pump's properties with new data
            if (data.pumpName !== undefined) {
                existingPump.pumpName = data.pumpName
            }

            // Only update fuel products if provided
            if (data.fuelProducts) {
                existingPump.fuelProducts = data.fuelProducts.map(
                    (product) => ({
                        name: product.name,
                        price: { [product.currency]: product.price }, // Ensure price is structured correctly
                    }),
                )
            }

            // Save the updated pump in the database
            return await this.pumpRepository.save(existingPump)
        } catch (error) {
            console.error('Error updating pump:', error)
            throw new Error(`Failed to update pump with id ${id}`)
        }
    }

    /**
     * Delete a Pump by ID
     */
    public async deletePump(id: string): Promise<Pump | null> {
        try {
            const pump = await this.pumpRepository.findOne({
                where: { pumpId: id },
            })
            if (!pump) return null
            await this.pumpRepository.remove(pump)
            return pump
        } catch (error) {
            throw new Error(`Failed to delete pump with id ${id}`)
        }
    }
}

export default new PumpService()
