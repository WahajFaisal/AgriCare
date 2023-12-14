import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity()
export class Crop {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sellerId!: number;

  @Column()
  category!: string;

  @Column()
  name!: string;

  @Column()
  quantity!: number;

  @Column()
  location!: string;

  @Column()
  description!: string;

  @Column()
  type!: string;

  @Column()
  recommendedPrice!: number;

  @Column()
  quality!: string;

  @Column()
  price!: number;

  @Column()
  moisture!: number;

  @Column()
  approved!: boolean;
}
