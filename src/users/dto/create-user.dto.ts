import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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
