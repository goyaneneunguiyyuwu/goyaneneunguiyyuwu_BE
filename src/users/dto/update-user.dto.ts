import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ type: 'string', nullable: true })
  @IsString()
  nickName: string;

  @IsOptional()
  @ApiProperty({ type: 'string', nullable: true })
  @IsString()
  profileImage: string;
}
