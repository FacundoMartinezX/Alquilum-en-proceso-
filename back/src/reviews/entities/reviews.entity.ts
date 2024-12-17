import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'int' })
  calificacion: number;

  @ManyToOne(() => SpaceWork, (spaceWork) => spaceWork.review)
  spaceWork: SpaceWork;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({name: 'userId'})
  user: User;
}