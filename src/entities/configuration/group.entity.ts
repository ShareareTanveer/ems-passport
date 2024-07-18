import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EGroupType } from '../enum/group.enum';

@Entity('group', { orderBy: { id: 'DESC' } })
export class Group {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;
    
    // @Column({
    //     type: 'enum',
    //     enum: EGroupType,
    //     nullable: false
    // })
    // type: EGroupType;
}