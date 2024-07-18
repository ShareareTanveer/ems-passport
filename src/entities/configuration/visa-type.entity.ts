import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('visa_type', { orderBy: { id: 'DESC' } })
export class VisaType {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;
}