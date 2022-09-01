import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'string' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  password: string;
}
