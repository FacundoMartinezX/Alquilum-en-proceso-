import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @Column()
  comentario: string;
  
  @Column()
  calificacion: number;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => SpaceWork, (spaceWork) => spaceWork.review)
  @JoinColumn({ name: 'spaceWorkId' })
  spaceWork: SpaceWork;
}