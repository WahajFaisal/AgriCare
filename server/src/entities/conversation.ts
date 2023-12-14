import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  message!: string;

  @Column()
  time!: string;
}
