import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ponente } from './ponente.entity';
import { Auditorio } from './auditorio.entity';
import { Asistente } from './asistente.entity';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ type: 'timestamptz' })
  fecha: Date;

  @Column({ type: 'int' })
  duracionHoras: number;

  @Column({ default: 'Propuesto' })
  estado: string;

  @ManyToOne(() => Ponente, (ponente) => ponente.eventos, {
    eager: true,
  })
  ponente: Ponente;

  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos, {
    eager: true,
    nullable: true,
  })
  auditorio: Auditorio | null;

  @OneToMany(() => Asistente, (asistente) => asistente.evento, {
    cascade: true,
  })
  asistentes: Asistente[];
}
