/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  // POST /api/eventos
  @Post()
  crearEvento(@Body() dto: CreateEventoDto) {
    return this.eventoService.crearEvento(dto);
  }

  // GET /api/eventos/:id
  @Get(':id')
  findEventoById(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.findEventoById(id);
  }

  // GET /api/eventos
  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  // POST /api/eventos/:id/aprobar
  @Post(':id/aprobar')
  aprobarEvento(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.aprobarEvento(id);
  }

  // DELETE /api/eventos/:id
  @Delete(':id')
  eliminarEvento(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.eliminarEvento(id);
  }
}

