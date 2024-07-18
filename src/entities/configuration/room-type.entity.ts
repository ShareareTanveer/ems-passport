import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('room_type', { orderBy: { id: 'DESC' } })
export class RoomType {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;
}