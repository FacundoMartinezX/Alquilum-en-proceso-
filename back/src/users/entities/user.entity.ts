import { Reserve } from 'src/reserve/entities/reserve.entity';
import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './reviews.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  name: string;

  @Column({ unique: true})
  email: string;

  @Column()
  password: string;
  
  @Column()
  address: string;

  @Column({})
  tipoUsuario: string;

  @Column()
  phone: number;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Reserve, (reserve) => reserve.inquilino)
  reservas: Reserve[];

  @OneToMany(() => SpaceWork, (spaceWork) => spaceWork.owner)
  spaceWork: SpaceWork[];
}
