import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('agency', { orderBy: { id: 'DESC' } })
export class Agency {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;
}