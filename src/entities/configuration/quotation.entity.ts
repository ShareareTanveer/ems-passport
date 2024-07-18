import { IsString, IsNumber, IsDate, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../client/client.entity';

@Entity({ name: 'quotation' })
export class Quotation {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ManyToOne(() => Client, client => client.id, { nullable: false })
    client: Client;

    @Column({ type: 'varchar', length: 50, nullable: false })
    @IsString()
    @Length(1, 50)
    quotationNo: string;

    @Column({ type: 'date', nullable: false })
    @IsDate()
    quotationDate: Date;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @IsString()
    billingInfo: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @IsString()
    product: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    @IsString()
    country: string;

    @Column({ type: 'text', nullable: true })
    @IsString()
    description?: string;

    @Column({ type: 'int', nullable: false })
    @IsNumber()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    @IsNumber()
    unitPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    @IsNumber()
    totalPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    @IsNumber()
    subTotal: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    @IsNumber()
    discount?: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    @IsNumber()
    netTotal: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    @IsNumber()
    dueAmount?: number;
}
