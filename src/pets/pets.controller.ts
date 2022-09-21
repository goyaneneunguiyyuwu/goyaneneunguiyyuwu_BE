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
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePetDto } from './dto/create-pet.dto';
import { AuthenticatedGuard } from 'src/auth/authentiacted.guard';
import { UpdatePetDto } from './dto/update-pet.dto';

@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('create')
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @ApiResponse({
    status: 201,
    description: 'Pet 정보 등록 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'Pet 정보 등록 실패',
  })
  public async createPetController(
    @Request() req,
    @Body() createPetDto: CreatePetDto,
  ) {
    await this.petsService.create(req.user.familyId, createPetDto);
  }

  @Get('info/:petId')
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @ApiResponse({
    status: 201,
    description: 'Pet 정보 불러오기 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'Pet 정보 불러오기 실패',
  })
  public async getPetInfoController(@Request() req, @Param() params) {
    const petId = parseInt(params.petId);
    return this.petsService.info(req.user.familyId, petId);
  }

  @Patch('info/:petId')
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @ApiResponse({
    status: 201,
    description: 'Pet 정보 수정 성공',
  })
  @ApiResponse({
    status: 403,
    description: 'Pet 정보 수정 실패',
  })
  public async changePetInfoController(
    @Request() req,
    @Param() params,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    const petId = parseInt(params.petId);
    await this.petsService.modify(req.user.familyId, petId, updatePetDto);
  }
}
