import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { Bid } from "./bid";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  cnic!: string;

  @Column()
  description!: string;

  @Column()
  location!: string;

  @Column()
  role!: string;

  @Column({ default: 0 })
  rate!: number;

  @Column({ default: 0 })
  totalRate!: number;

  @Column()
  experties!: string;

  @Column()
  verify!: boolean;

  @Column()
  otpVerify!: boolean;

  @Column()
  token!: string;

  @Column()
  mongoId!: string;
}
