import {
  IsIn,
  IsInt,
  IsString,
  Min,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreatePonenteDto {
  @IsInt()
  @Min(1)
  cedula: number;

  @IsString()
  @MinLength(3)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['Interno', 'Invitado'])
  tipoPonente: string;

  @IsString()
  @MinLength(3)
  especialidad: string;
}
