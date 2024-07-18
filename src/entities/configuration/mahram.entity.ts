import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('maharam', { orderBy: { id: 'DESC' } })
export class Maharam  {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;
}