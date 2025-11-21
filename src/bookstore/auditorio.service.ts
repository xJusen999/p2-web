import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditorio } from './entities/auditorio.entity';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';

@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(Auditorio)
    private readonly auditorioRepo: Repository<Auditorio>,
  ) {}

  async crearAuditorio(dto: CreateAuditorioDto): Promise<Auditorio> {
    if (dto.capacidad <= 0) {
      throw new BadRequestException(
        'La capacidad del auditorio debe ser mayor de cero',
      );
    }

    const auditorio = this.auditorioRepo.create(dto);
    return this.auditorioRepo.save(auditorio);
  }

  async findAll(): Promise<Auditorio[]> {
    return this.auditorioRepo.find();
  }

  async findById(id: number): Promise<Auditorio> {
    const auditorio = await this.auditorioRepo.findOne({ where: { id } });
    if (!auditorio) {
      throw new NotFoundException('Auditorio no encontrado');
    }
    return auditorio;
  }
}
