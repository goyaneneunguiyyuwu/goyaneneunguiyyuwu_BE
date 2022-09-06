import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('pets')
@Controller('api/pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Pet 정보 등록 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'Pet 정보 등록 실패',
  })
  public async createPetController() {}

  @Get('info')
  @ApiResponse({
    status: 201,
    description: 'Pet 정보 불러오기 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'Pet 정보 불러오기 실패',
  })
  public async getPetInfoController() {}

  @Patch('info/change')
  @ApiResponse({
    status: 201,
    description: 'Pet 정보 수정 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'Pet 정보 수정 실패',
  })
  public async changePetInfoController() {}
}
