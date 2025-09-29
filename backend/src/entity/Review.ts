import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id!: number; 

    @Column({ type: 'int'})
    userId!: number; 

    @Column({ type: 'int'})
    productId!: number; 

    @Column({ type: 'int'})
    rating!: number; 

    @Column({ type: 'text'})
    title!: string; 

    @Column({ type: 'text'})
    comment!: string;
    
    @CreateDateColumn()
    createdAt!: Date; 

    //relations in User entity
    @ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE'}) 
    @JoinColumn({ name: 'userId'})
    user!: User; 

    //relations in Product table
    @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'productId'})
    product!: Product; 
}