import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LocalLoginDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'test@test.com',
    description: '로컬 유저의 이메일',
  })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'test1234',
    description: '로컬 유저의 비밀번호',
  })
  @IsString()
  password: string;
}
export class KakaoLoginDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'test@test.com',
    description: '카카오 oauth 유저의 이메일',
  })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    example: 1231234,
    description: '카카오 oauth 유저의 식별자',
  })
  @IsNumber()
  kakaoId: number;
}
// pets
export type Sex = 'male' | 'female';
