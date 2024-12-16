import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Comentario de la reseña',
    example: 'El espacio es muy cómodo y tiene excelente iluminación.',
  })
  @IsString()
  @IsNotEmpty()
  comentario: string;

  @ApiProperty({
    description: 'Calificación del espacio (entre 1 y 5)',
    example: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion: number;

  @ApiProperty({
    description: 'ID del espacio asociado a la reseña',
    example: 'uuid-del-espacio',
  })
  @IsString()
  @IsNotEmpty()
  spaceWorkId: string;
}