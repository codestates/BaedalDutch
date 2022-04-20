import { Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn ,ManyToOne} from "typeorm"
import { Users } from "./User"

@Entity()
export class Parties {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    store_name: string

    @Column()
    food_category: string

    @Column()
    member_num: number

    @Column()
    content: string

    @Column()
    fee: number

    @Column()
    address: string

    @Column()
    closed: boolean

    @CreateDateColumn({})
    createdAt: Timestamp

    @ManyToOne(() => Users, user => user.party)
    user: Users;
}
