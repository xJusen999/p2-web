import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';

@Controller('auditorios')
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  // POST /api/auditorios
  @Post()
  crearAuditorio(@Body() dto: CreateAuditorioDto) {
    return this.auditorioService.crearAuditorio(dto);
  }

  // GET /api/auditorios
  @Get()
  findAll() {
    return this.auditorioService.findAll();
  }

  // GET /api/auditorios/:id
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.auditorioService.findById(id);
  }
  //post y get basico
}
