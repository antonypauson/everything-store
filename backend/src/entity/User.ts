//User entity
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Review } from "./Review";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number; 

    @Column()
    username!: string; 

    @Column({unique: true})
    email!: string; 

    @Column()
    password!: string; 

    @Column({default:'user'})
    role!: string; 

    @CreateDateColumn()
    createdAt!: Date; 

    @UpdateDateColumn()
    updatedAt!: Date; 

    //relation of Review entity
    @OneToMany(() => Review, review => review.user)
    reviews?: Review[]; 
}