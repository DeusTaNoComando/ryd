import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { POIOpeningHours, POIStatus } from '../enums/poi.enums'
import { Address } from '../interfaces/poi.interfaces'
import { Pump } from './pump.entity'

@Entity('pois')
export class POI extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id!: string

    @Column({
        type: 'enum',
        enum: POIStatus,
        default: POIStatus.OFFLINE,
    })
    public status!: POIStatus

    @Column('jsonb')
    public address!: Address

    @Column({
        type: 'enum',
        enum: POIOpeningHours,
    })
    public openingHoursPattern!: POIOpeningHours

    @OneToMany(() => Pump, (pump) => pump.poi, { cascade: true })
    public pumps!: Pump[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
