import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ponente } from './entities/ponente.entity';
import { Evento } from './entities/evento.entity';
import { CreatePonenteDto } from './dto/create-ponente.dto';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
  ) {}

  async crearPonente(dto: CreatePonenteDto): Promise<Ponente> {
    if (dto.tipoPonente === 'Interno') {
      if (!dto.email.endsWith('.edu')) {
        throw new BadRequestException(
          'El mail de un ponente Interno debe terminar en .edu',
        );
      }
    }

    const ponente = this.ponenteRepo.create(dto);
    return this.ponenteRepo.save(ponente);
  }

  async findPonenteById(id: number): Promise<Ponente> {
    const ponente = await this.ponenteRepo.findOne({ where: { id } });
    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }
    return ponente;
  }

  async eliminarPonente(id: number): Promise<void> {
    const ponente = await this.findPonenteById(id);

    const eventosAsociados = await this.eventoRepo.count({
      where: { ponente: { id: ponente.id } },
    });

    if (eventosAsociados > 0) {
      throw new BadRequestException(
        'No se puede eliminar un ponente con eventos asociados',
      );
    }

    await this.ponenteRepo.remove(ponente);
  }
}
