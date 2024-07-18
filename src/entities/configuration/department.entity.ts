import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity('department', { orderBy: { id: 'DESC' } })
export class Department {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @ManyToOne(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
