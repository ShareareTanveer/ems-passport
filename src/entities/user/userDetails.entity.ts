import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsPhoneNumber,
  IsOptional,
  IsEnum,
  Length,
  IsString,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import { EGender } from '../enum/gender.enum';

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

  // @Column({ type: 'date', nullable: false })
  // @IsDate()
  // birthDate: Date;
}
