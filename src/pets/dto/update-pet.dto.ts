import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdatePetDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: '바둑이',
    description: '반려동물의 이름',
  })
  @IsString()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    example: '3',
    description: '반려동물의 종',
  })
  @Min(1)
  @Max(2)
  @IsNumber()
  species: number;

  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    example: '3',
    description: '반려동물의 품종',
  })
  @Min(1)
  @Max(155)
  @IsNumber()
  breeds: number;

  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    example: '1',
    description: '반려동물의 성별, 1: male, 2: female',
  })
  @Min(1)
  @Max(2)
  @IsNumber()
  sex: number;

  @IsNotEmpty()
  @ApiProperty({
    type: 'date',
    example: '2018-05-23T18:25:43.511Z',
    description: '반려동물의 생일',
  })
  @IsDateString()
  birthDate: Date;

  @IsNotEmpty()
  @ApiProperty({
    type: 'date',
    example: '2018-05-23T18:25:43.511Z',
    description: '반려동물과 함께 살기 시작한 날',
  })
  @IsDateString()
  togetherDate: Date;

  @IsNotEmpty()
  @ApiProperty({
    type: 'decimal',
    example: '3.5',
    description: '반려동물의 무게',
  })
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'weight must be a number conforming to the 1 decimal places' },
  )
  weight: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'boolean',
    example: 'true',
    description: '반려동물의 중성화 여부',
  })
  @IsBoolean()
  neutering: boolean;
}
