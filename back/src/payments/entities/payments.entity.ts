import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number; 

    @Column()
    datePayment: Date;
  
    @Column({ type: 'enum', enum: ['approved', 'pending', 'rejected'], default: 'pending' })
    status: 'approved' | 'pending' | 'rejected'; 
  
    @Column({ nullable: true })
    paymentMethod?: string; 

}