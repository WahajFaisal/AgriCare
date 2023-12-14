import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inspection
{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    sellerId!:number;

    @Column()
    crop!:string;

    @Column()
    cropId!:number;
}