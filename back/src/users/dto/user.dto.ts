import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '1',
  })
  userId: number;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'List of reviews made by the user',
    example: [],
  })
  review: any[];

  @ApiProperty({
    description: 'List of reservations made by the user',
    example: [],
  })
  reservas: any[];

  @ApiProperty({
    description: 'List of spaces published by the user',
    example: [],
  })
  espaciosPublicados: any[];
}