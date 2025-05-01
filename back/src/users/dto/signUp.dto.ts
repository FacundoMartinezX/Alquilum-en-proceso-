import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'Password123!',
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'User type',
    example: 'INQUILINO',
  })


  @IsString()
  address: string;
}