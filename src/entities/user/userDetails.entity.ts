import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsPhoneNumber, IsOptional, IsEnum, Length, IsString, IsNotEmpty } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

import { EGender } from '../enum/user.enum';

import { User } from './user.entity';


@Entity('user_details', { orderBy: { id: 'DESC' } })
export class UserDetail {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 15, nullable: true })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsOptional()
  phone: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  @IsOptional()
  address: string;

  @Column({ length: 100, nullable: true })
  @IsString()
  @Length(0, 100)
  @IsOptional()
  country: string;

  @Column({ length: 50, nullable: true })
  @IsString()
  @IsOptional()
  nationality: string;

  @Column({ type: 'enum', enum: EGender, nullable: true })
  @IsNotEmpty()
  @IsEnum(EGender, { message: 'Gender must be Male, Female, or Other' })
  gender: EGender;
  
  @OneToOne(() => User, user => user.details)
  @JoinColumn({ name: 'userId' })
  @Exclude()
  user: User;

  @Expose()
  getUserId(): number {
    return this.user?.id;
  }
}
