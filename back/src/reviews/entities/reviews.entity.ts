import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column({ type: 'text' })
  comentario: string; 

  @Column({ type: 'int', width: 1 })
  calification: number; 

  @ManyToOne(() => User, us => us.review)
  user: string;

  @ManyToOne(() => SpaceWork, sw => sw.review)
  spaceWork: SpaceWork;
}