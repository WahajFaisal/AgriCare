import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  expertId!: number;

  @Column()
  content!: string;
}
