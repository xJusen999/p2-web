import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAsistenteDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @MinLength(3)
  codigoEstudiante: string;

  @IsEmail()
  email: string;
}
