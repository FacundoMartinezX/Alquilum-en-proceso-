import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Disponibility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

 @ManyToOne(() => SpaceWork, sw => sw.disponibility)
  spaceWork: SpaceWork;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ default: true })
  isDisponibility: boolean;
}