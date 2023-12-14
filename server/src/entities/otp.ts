import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class OTP {
  @PrimaryColumn()
  email!: string;

  @Column()
  otp!: number;
}
