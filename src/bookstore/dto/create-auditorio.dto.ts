import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateAuditorioDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsInt()
  @Min(1)
  capacidad: number;

  @IsString()
  @MinLength(3)
  ubicacion: string;
}
