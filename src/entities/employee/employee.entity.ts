import {
  IsString,
  IsDate,
  IsEnum,
  IsNumber,
  Length,
  IsOptional,
} from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Designation } from '../configuration/designation.entity';
import { Department } from '../configuration/department.entity';
import { User } from '../user/user.entity';
import { EBloodGroup } from '../enum/blood-group.enum';

@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsString()
  @Length(1, 50)
  idCardNo: string;

  @OneToMany(() => Department, (department) => department.employees)
  department: Department;

  @OneToMany(() => Designation, (designation) => designation.employees)
  designation: Designation;

  // @Column({ type: 'enum', enum: EBloodGroup, nullable: false })
  // @IsEnum(EBloodGroup)
  // bloodGroup: EBloodGroup;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @IsNumber()
  salary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  commission?: number;

  @Column({ type: 'date', nullable: false })
  @IsDate()
  appointmentDate: Date;

  @Column({ type: 'date', nullable: false })
  @IsDate()
  joiningDate: Date;

}
