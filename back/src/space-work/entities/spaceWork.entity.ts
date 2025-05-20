import { Reserve } from "src/reserve/entities/reserve.entity";
import { Review } from "src/reviews/entities/reviews.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SpaceWork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 255 })
  ubicacion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'integer', default: 0 })
  capacidad: number;

  @Column({ type: 'simple-array' })
  servicios: string[]; 

  @Column({ type: 'simple-array' })
  category: string; 

  @Column({ type: 'simple-array' })
  fotos: string[]; 

  @Column({ default: true })
  isAvailable: boolean;
  
  @ManyToOne(() => User, user => user.spaceWork)
  owner: User; 

  @OneToMany(() => Reserve, res => res.spaceWork)
  reservas: Reserve[]; 

  @OneToMany(() => Review, rev => rev.spaceWork, {onDelete: 'CASCADE'})
  review: Review[]; 
}