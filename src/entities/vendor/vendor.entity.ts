import { IsString, IsEmail, IsEnum, IsNumber, Length, IsMobilePhone, IsOptional, IsDate } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

enum OpeningBalanceType {
    DEBIT = 'debit',
    CREDIT = 'credit'
}

enum ProductType {
    AIR_TICKET = 'air_ticket',
    AIR_TICKET_NON_COMMISSION = 'air_ticket_non_commission',
    AIR_TICKET_REISSUE = 'air_ticket_reissue',
    AIRPORT_CONTRACT = 'airport_contract',
    BUS_TICKET = 'bus_ticket',
    CAR_RENTAL = 'car_rental',
    DUBAI_VISA = 'dubai_visa',
    GERMANY_VISA = 'germany_visa'
}

@Entity({ name: 'vendor' })
export class Vendor {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    // @Column({ type: 'varchar', length: 255, nullable: false })
    // @IsString()
    // @Length(1, 255)
    // name: string;

    // @Column({ type: 'varchar', length: 255, nullable: false })
    // @IsEmail()
    // email: string;

    // @Column({ type: 'varchar', length: 20, nullable: false })
    // @IsString()
    // @IsMobilePhone()
    // mobile: string;

    // @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    // @IsOptional()
    // @IsNumber()
    // fixedAdvance?: number;

    // @CreateDateColumn({ type: 'date' })
    // @IsDate()
    // date: Date;

    // @Column({ type: 'enum', enum: OpeningBalanceType, nullable: false })
    // @IsEnum(OpeningBalanceType)
    // openingBalanceType: OpeningBalanceType;

    // @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    // @IsOptional()
    // @IsNumber()
    // openingBalance?: number;

    // @Column({ type: 'varchar', nullable: false })
    // @IsString()
    // address: string;

    // @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    // @IsOptional()
    // @IsNumber()
    // creditLimit?: number;

    // @Column({ type: 'simple-array', nullable: true })
    // @IsOptional()
    // products?: ProductType[];
}
