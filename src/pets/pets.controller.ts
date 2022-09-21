import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePetDto } from './dto/create-pet.dto';
import { AuthenticatedGuard } from 'src/auth/authentiacted.guard';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('create')
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: '반려동물 생성 API',
    description: '반려동물을 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'Pet 정보 등록 성공',
  })
  @ApiResponse({
    status: 404,
    description: '가족이 존재하지 않습니다.',
  })
  public async createPetController(
    @Request() req,
    @Body() createPetDto: CreatePetDto,
  ): Promise<void> {
    await this.petsService.create(req.user.familyId, createPetDto);
  }

  @Get('info/:petId')
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: '반려동물 정보 API',
    description: '반려동물 정보를 가져온다.',
  })
  @ApiResponse({
    status: 201,
    description: 'Pet 정보 불러오기 성공',
  })
  @ApiResponse({
    status: 406,
    description: '해당 유저가 접근 할 수 없는 반려동물입니다.',
  })
  public async getPetInfoController(
    @Request() req,
    @Param() params,
  ): Promise<Pet> {
    const petId = parseInt(params.petId);
    return this.petsService.info(req.user.familyId, petId);
  }

  @Patch('info/:petId')
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: '반려동물 정보 수정 API',
    description: '반려동물 정보를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'Pet 정보 수정 성공',
  })
  @ApiResponse({
    status: 406,
    description: '해당 유저가 접근 할 수 없는 반려동물입니다.',
  })
  public async changePetInfoController(
    @Request() req,
    @Param() params,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<void> {
    const petId = parseInt(params.petId);
    await this.petsService.modify(req.user.familyId, petId, updatePetDto);
  }
}
