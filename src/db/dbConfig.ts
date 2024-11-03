import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { POI } from '../entities/poi.entity'
import { Pump } from '../entities/pump.entity'

dotenv.config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Pump, POI],
    synchronize: true, // Auto-creates and synchronizes tables on each run
    logging: Boolean(process.env.DB_LOGGING), // Optional, for debugging SQL queries
})
