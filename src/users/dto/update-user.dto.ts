import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', nullable: true })
  @IsString()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', nullable: true })
  @IsString()
  profileImage: string;
}
