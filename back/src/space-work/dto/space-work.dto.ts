  import { ApiProperty } from '@nestjs/swagger';
  import { Type } from 'class-transformer';
  import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsDate } from 'class-validator';

  export class CreateSpaceDto {

  

    @ApiProperty({
      description: 'Título del espacio',
      example: 'Departamento moderno en el centro',
    })
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @ApiProperty({
      description: 'Descripción del espacio',
      example: 'Un lugar acogedor y bien equipado para disfrutar de tu estadía.',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
      description: 'Ubicación del espacio',
      example: '123 Calle Principal, Ciudad Ejemplo',
    })
    @IsString()
    @IsNotEmpty()
    ubicacion: string;

    @ApiProperty({
      description: 'Precio por día',
      example: 150.5,
    })
    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @ApiProperty({
      description: 'Capacidad máxima de personas',
      example: 4,
    })
    @IsNumber()
    capacidad: number;

    @ApiProperty({
      description: 'Lista de servicios que ofrece el espacio',
      example: ['WiFi', 'Cocina', 'Estacionamiento'],
    })
    @IsArray()
    @IsNotEmpty()
    servicios: string[];

    @ApiProperty({
      description: 'Lista de servicios que ofrece el espacio',
      example: ['WiFi', 'Cocina', 'Estacionamiento'],
    })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({
      description: 'Lista de URLs de fotos del espacio',
      example: ['http://example.com/foto1.jpg', 'http://example.com/foto2.jpg'],
    })
    @IsArray()
    @IsNotEmpty()
    fotos: string[];

    @ApiProperty({
      description: 'ID del creador del espacio',
      example: 'fds56ds-5r5e65rdf-fddscs5d5d',
    })
    @IsString()
    @IsNotEmpty()
    userId: string;
  }