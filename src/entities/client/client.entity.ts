import {
  IsString,
  IsEmail,
  IsEnum,
  IsNumber,
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
import { ClientCategory } from '../configuration/client-cetegory.entity';
import { Source } from '../configuration/source.entity';
import { User } from '../user/user.entity';
import { EClientType, EWalkingCustomerType } from '../enum/client.enum';
import { EOpeningBalanceType } from '../enum/openning-balance-type.enum';

@Entity({ name: 'client' })
export class Client {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => ClientCategory,
    (clientCategory) => clientCategory.clients,
  )
  clientCategory: ClientCategory;

  // @Column({ type: 'enum', enum: EClientType, nullable: false })
  // @IsEnum(EClientType)
  // clientType: EClientType;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  @IsString()
  designation?: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @IsString()
  tradeLicenseNo?: string;

  // @Column({ type: 'enum', enum: EOpeningBalanceType, nullable: false })
  // @IsEnum(EOpeningBalanceType)
  // openingBalanceType: EOpeningBalanceType;

  // @Column({ type: 'enum', enum: EWalkingCustomerType, nullable: false })
  // @IsEnum(EWalkingCustomerType)
  // walkingCustomer: EWalkingCustomerType;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  creditLimit?: number;

  // @Column()
  // @OneToMany(() => Source, (source) => source.id, { nullable: true })
  // @JoinColumn()
  // source?: Source;
}
