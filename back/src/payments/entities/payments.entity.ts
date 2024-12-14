import { Reserve } from "src/reserve/entities/reserve.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
  
    @OneToOne(() => Reserve, re => re.isAvaiable)
    reserve: Reserve;
}