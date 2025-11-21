import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistente } from './entities/asistente.entity';
import { Evento } from './entities/evento.entity';
import { CreateAsistenteDto } from './dto/create-asistente.dto';

@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepo: Repository<Asistente>,
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
  ) {}

  //no puede haber dos asistentes con el mismo email en un mismo evento.
  //no puede superarse la capacidad del auditorio del evento.
  async registrarAsistente(
    eventoId: number,
    dto: CreateAsistenteDto,
  ): Promise<Asistente> {
    const evento = await this.eventoRepo.findOne({
      where: { id: eventoId },
      relations: ['asistentes', 'auditorio'],
    });

    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    if (!evento.auditorio) {
      throw new BadRequestException(
        'No se pueden registrar asistentes en un evento sin auditorio asignado',
      );
    }

    const yaRegistrado = evento.asistentes?.some((a) => a.email === dto.email);

    if (yaRegistrado) {
      throw new BadRequestException(
        'Ya existe un asistente con ese email en este evento',
      );
    }

    const capacidad = evento.auditorio.capacidad;
    const asistentesActuales = evento.asistentes?.length ?? 0;

    if (asistentesActuales >= capacidad) {
      throw new BadRequestException(
        'No se pueden registrar más asistentes: se alcanzó la capacidad del auditorio',
      );
    }

    const asistente = this.asistenteRepo.create({
      ...dto,
      evento,
    });

    return this.asistenteRepo.save(asistente);
  }

  async findAsistentesByEvento(eventoId: number): Promise<Asistente[]> {
    const evento = await this.eventoRepo.findOne({
      where: { id: eventoId },
      relations: ['asistentes'],
    });

    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    return evento.asistentes ?? [];
  }
}
