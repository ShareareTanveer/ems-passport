import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('source', { orderBy: { id: 'DESC' } })
export class Source {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;
}