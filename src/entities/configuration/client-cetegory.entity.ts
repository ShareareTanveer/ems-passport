import { IsString, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Client } from '../client/client.entity';

@Entity({ name: 'client_category' })
export class ClientCategory {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @IsString()
  @Length(1, 100)
  categoryName: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  @IsString()
  @Length(1, 10)
  categoryPrefix: string;

  @ManyToOne(() => Client, (client) => client.clientCategory)
  clients: Client[];
}
