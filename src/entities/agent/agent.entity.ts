import { IsString, IsEmail, IsEnum, IsNumber, IsMobilePhone, IsOptional, IsDate, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EOpeningBalanceType } from '../enum/openning-balance-type.enum';


@Entity({ name: 'agent' })
export class Agent {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
    @IsNumber()
    commissionRate: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    @IsString()
    nidNo: string;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @IsString()
    agentImage?: string;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @IsString()
    agentIDCardFront?: string;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @IsString()
    agentIDCardBack?: string;

    // @Column({ type: 'enum', enum: EOpeningBalanceType, nullable: false })
    // @IsEnum(EOpeningBalanceType)
    // openingBalanceType: EOpeningBalanceType;
}
