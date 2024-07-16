import { IsPhoneNumber, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NonInvoiceCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    companyName: string;

    @Column()
    @IsString()
    companyContactPerson: string;

    @Column()
    @IsString()
    designation: string;

    @Column()
    @IsString()
    @IsPhoneNumber()
    phone: string;

    @Column()
    @IsString()
    address: string;
}
