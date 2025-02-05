import { SpaceWork } from "src/space-work/entities/spaceWork.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


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

  @Column({default: true})
  status: boolean;

  @ManyToOne(() => SpaceWork, sw => sw.reservas, {cascade: true, onDelete: 'CASCADE'})
  spaceWork: SpaceWork;

  @ManyToOne(() => User, us => us.reservas)
  user: User;
}