import { SpaceWork } from "src/space-work/entities/spaceWork.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Status {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  CANCELADA = 'cancelada',
}

@Entity()
export class Reserve {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ nullable: true })
  duration?: string;

  @ManyToOne(() => User, us => us.reservas)
  inquilino: User;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @ManyToOne(() => SpaceWork, sw => sw.reservas)
  spaceWork: SpaceWork;

  @ManyToOne(() => User, us => us.reservas)

  @Column({ default: true })
  isAvaiable: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;
}