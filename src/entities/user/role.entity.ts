import { Entity, PrimaryGeneratedColumn, Column, OneToMany,JoinTable,ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => User, user => user.role)
    users: User[]; 

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'role_permissions_permission',
        joinColumn: { name: 'roleId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' },
    })
    permissions: Permission[];

}