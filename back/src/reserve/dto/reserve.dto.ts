import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    description: 'ID del espacio de trabajo reservado',
    example: 'e8f1d5f4-9b76-4d3a-8c89-2e9b0df79c92',
  })
  @IsUUID()
  @IsNotEmpty()
  spaceWorkId: string;

  @ApiProperty({
    description: 'ID del usuario que realiza la reserva',
    example: 'f65a9c2d-8a1d-4dc9-a94c-0b9e8e9d1234',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;


}