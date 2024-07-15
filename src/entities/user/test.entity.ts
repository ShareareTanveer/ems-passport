import { Entity, PrimaryGeneratedColumn, Column, OneToMany,JoinTable,ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;


}