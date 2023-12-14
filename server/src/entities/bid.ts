import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  buyerId!: number;

  @Column()
  myPrice!: number;

  @Column()
  product!: number;
}
