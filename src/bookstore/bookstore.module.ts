import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ponente } from './entities/ponente.entity';
import { Auditorio } from './entities/auditorio.entity';
import { Asistente } from './entities/asistente.entity';
import { Evento } from './entities/evento.entity';

import { PonenteService } from './ponente.service';
import { AuditorioService } from './auditorio.service';
import { AsistenteService } from './asistente.service';
import { EventoService } from './evento.service';

import { EventoController } from './evento.controller';
import { AuditorioController } from './auditorio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ponente, Auditorio, Asistente, Evento])],
  providers: [
    PonenteService,
    AuditorioService,
    AsistenteService,
    EventoService,
  ],
  controllers: [EventoController, AuditorioController],
})
export class BookstoreModule {} //base de practica que tenia
