import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LocalLoginDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  @IsString()
  password: string;
}

export class ChangeUserInfoResponse {}

// pets
export type Sex = 'male' | 'female';
