import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { Ponente } from './entities/ponente.entity';
import { Auditorio } from './entities/auditorio.entity';
import { CreateEventoDto } from './dto/create-evento.dto';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,
    @InjectRepository(Auditorio)
    private readonly auditorioRepo: Repository<Auditorio>,
  ) {}

  async crearEvento(dto: CreateEventoDto): Promise<Evento> {
    if (dto.duracionHoras <= 0) {
      throw new BadRequestException('La duración debe ser positiva');
    }

    const ponente = await this.ponenteRepo.findOne({
      where: { id: dto.ponenteId },
    });

    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }

    if (ponente.tipoPonente === 'Invitado' && dto.descripcion.length < 50) {
      throw new BadRequestException(
        'Si el ponente es Invitado, la descripción debe tener al menos 50 caracteres',
      );
    }

    let auditorio: Auditorio | null = null;
    if (dto.auditorioId !== undefined) {
      auditorio = await this.auditorioRepo.findOne({
        where: { id: dto.auditorioId },
      });
      if (!auditorio) {
        throw new NotFoundException('Auditorio no encontrado');
      }
    }

    const evento = this.eventoRepo.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      fecha: new Date(dto.fecha),
      duracionHoras: dto.duracionHoras,
      estado: dto.estado ?? 'Propuesto',
      ponente,
      auditorio: auditorio ?? null,
    });

    return this.eventoRepo.save(evento);
  }

  async aprobarEvento(id: number): Promise<Evento> {
    const evento = await this.findEventoById(id);

    if (!evento.auditorio) {
      throw new BadRequestException(
        'No se puede aprobar un evento sin auditorio asignado',
      );
    }

    evento.estado = 'Aprobado';
    return this.eventoRepo.save(evento);
  }

  async eliminarEvento(id: number): Promise<void> {
    const evento = await this.findEventoById(id);

    if (evento.estado === 'Aprobado') {
      throw new BadRequestException(
        'No se puede eliminar un evento que ya está aprobado',
      );
    }

    await this.eventoRepo.remove(evento);
  }

  async findEventoById(id: number): Promise<Evento> {
    const evento = await this.eventoRepo.findOne({
      where: { id },
      relations: ['asistentes', 'ponente', 'auditorio'],
    });

    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    return evento;
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoRepo.find({
      relations: ['asistentes', 'ponente', 'auditorio'],
    });
  }
}
