import { IsPhoneNumber, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'non_invoice_company' })
export class NonInvoiceCompany extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @IsString()
    companyName: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @IsString()
    companyContactPerson: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    @IsString()
    designation: string;

    @Column({ type: 'varchar', length: 15, nullable: false })
    @IsString()
    @IsPhoneNumber(null)
    phone: string;

    @Column({ type: 'text', nullable: false })
    @IsString()
    address: string;
}
