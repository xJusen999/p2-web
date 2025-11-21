import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Evento } from './evento.entity';

@Entity()
export class Asistente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigoEstudiante: string;

  @Column()
  email: string;

  @ManyToOne(() => Evento, (evento) => evento.asistentes, {
    onDelete: 'CASCADE',
  })
  evento: Evento;
}
