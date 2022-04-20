import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { Parties } from "./Parties"

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    nickname: string

    @Column()
    password: string

    @Column()
    image: string

    @Column()
    phone_number: number

    @ManyToMany(() => Parties)
    @JoinTable()
    parties: Parties[];

    @OneToMany(() => Parties, party => party.user)
    party: Parties[];
}
