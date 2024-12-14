import { Reserve } from 'src/reserve/entities/reserve.entity';
import { Review } from 'src/reviews/entities/reviews.entity';
import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum TipoUsuario {
  INQUILINO = 'INQUILINO',
  PROPIETARIO = 'PROPIETARIO',
  ADMINISTRADOR = 'ADMINISTRADOR',
}

@Entity()
export class User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contraseña: string;

  @Column({
    type: 'enum',
    enum: TipoUsuario,
  })
  tipoUsuario: TipoUsuario;

  @Column()
  fechaRegistro: Date;

  @Column()
  telefono: string;
  
  @OneToMany(() => Review, rev => rev.user)
  review: Review[];
  
  @OneToMany(() => Reserve, res => res.inquilino)
  reservas: Reserve[];
  
  @OneToMany(() => SpaceWork, sw => sw.owner)
  espaciosPublicados: SpaceWork;
}
