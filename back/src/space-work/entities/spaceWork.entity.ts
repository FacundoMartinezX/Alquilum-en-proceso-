import { Disponibility } from "src/disponibility/entities/disponibility.entity";
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
  precioPorDia: number;

  @Column({ type: 'integer', default: 0 })
  capacidad: number;

  @Column({ type: 'simple-array' })
  servicios: string[]; 

  @Column({ type: 'simple-array' })
  fotos: string[]; 

  @OneToMany(() => Disponibility, dis => dis.spaceWork)
  disponibility: Disponibility[]; 

  @ManyToOne(() => User, user => user.espaciosPublicados)
  owner: User; 

  @OneToMany(() => Reserve, res => res.spaceWork)
  reservas: Reserve[]; 

  @OneToMany(() => Review, rev => rev.spaceWork)
  review: Review[]; 
}