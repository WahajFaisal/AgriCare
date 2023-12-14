import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  buyerId!: number;

  @Column()
  productId!: number;

  @Column()
  price!: number;

  @Column()
  status!: string;
}
