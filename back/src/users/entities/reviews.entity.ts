import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'int', width: 1, default: 5 })
  calificacion: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => SpaceWork, (spaceWork) => spaceWork.review, { onDelete: 'CASCADE' })
  spaceWork: SpaceWork;
}