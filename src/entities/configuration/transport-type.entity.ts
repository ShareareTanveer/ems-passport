import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('transport_type', { orderBy: { id: 'DESC' } })
export class TransportType {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;
}