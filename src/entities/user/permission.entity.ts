import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entity_name: string;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    codename: string;
}