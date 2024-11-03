// src/entities/Pump.ts

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { FuelProduct } from '../interfaces/poi.interfaces'
import { POI } from './poi.entity'

@Entity('pumps')
export class Pump extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public pumpId!: string

    @Column({ type: 'varchar', length: 50 })
    public pumpName!: string

    @Column('jsonb')
    public fuelProducts!: FuelProduct[]

    @ManyToOne(() => POI, (poi) => poi.pumps, { onDelete: 'CASCADE' })
    public poi!: POI

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
