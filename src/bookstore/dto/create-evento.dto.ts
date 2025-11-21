import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @MinLength(3)
  titulo: string;

  @IsString()
  @MinLength(10)
  descripcion: string;

  @IsDateString()
  fecha: string;

  @IsInt()
  @Min(1)
  duracionHoras: number;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsInt()
  ponenteId: number;

  @IsOptional()
  @IsInt()
  auditorioId?: number;
}
