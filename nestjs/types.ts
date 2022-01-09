import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNumber } from 'class-validator';
import { isNumberObject } from 'util/types';

// users
export class CreateUserResponse {
  @IsNumber()
  statusCode: number;
}

export class LocalLoginReqBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LocalLoginResponse {
  @IsNumber()
  statusCode: number;
}

export class ChangeUserInfoReqBody {}

export class ChangeUserInfoResponse {}

// pets
export type Sex = 'male' | 'female';
