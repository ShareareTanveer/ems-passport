import { IsString, IsEnum, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { EProductCategory } from '../enum/product.enum';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @IsString()
    @Length(1, 255)
    name: string;

    // @Column({ type: 'enum', enum: EProductCategory, nullable: false })
    // @IsEnum(EProductCategory)
    // category: EProductCategory;

}
