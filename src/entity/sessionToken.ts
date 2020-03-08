import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SessionToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idUser: number;

    @Column()
    isActive: boolean;

}