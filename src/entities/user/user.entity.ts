import { Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsNumber,IsStrongPassword } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

// Entities
import { BaseEntity } from '../base/base.entity';
import { Role } from './role.entity';
import { UserDetail } from './userDetails.entity';

@Entity('user', { orderBy: { id: 'DESC' } })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100, nullable: false })
  @Unique(['email'])
  email: string;

  @Column({ length: 100, nullable: false, select: false })
  @IsStrongPassword()
  password: string;

  @Column({ length: 255, nullable: true })
  firstName: string;

  @Column({ length: 255, nullable: true })
  lastName: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => Role, role => role.users)
  role: Role;


  @OneToOne(() => UserDetail)
  @JoinColumn()
  details: UserDetail
}
