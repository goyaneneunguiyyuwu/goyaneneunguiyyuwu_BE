import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { KakaoLoginDto, LocalLoginDto } from 'src/types';
import { CommonAuthGuard } from 'src/auth/common.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authentiacted.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // todo: 이메일, 비밀번호 validation
  @Post('signup')
  @HttpCode(201)
  @ApiOperation({
    summary: '로컬 유저 생성 API',
    description: '로컬 유저를 생성한다',
  })
  @ApiResponse({
    status: 201,
    description: '로컬 유저 회원가입 완료',
  })
  @ApiResponse({
    status: 409,
    description: '이미 가입된 유저입니다.',
  })
  public async signUpController(
    @Body() createUserDto: CreateUserDto,
  ): Promise<void> {
    return this.usersService.localSignUp(createUserDto);
  }

  @UseGuards(CommonAuthGuard)
  @Post('login')
  @ApiBody({ type: LocalLoginDto })
  @ApiOperation({
    summary: '로컬 로그인 API',
    description: '로컬 로그인하고 쿠키를 전달한다.',
  })
  @ApiResponse({
    status: 201,
    description: '로컬 로그인 성공',
  })
  @ApiResponse({
    status: 404,
    description: '존재 하지 않는 유저입니다.',
  })
  @ApiResponse({
    status: 401,
    description: '비밀번호가 올바르지 않습니다',
  })
  public async localLoginController(@Request() req): Promise<string> {
    return req.user;
  }

  @UseGuards(CommonAuthGuard)
  @Post('kakao')
  @ApiBody({ type: KakaoLoginDto })
  @ApiOperation({
    summary: '카카오 로그인 API && 카카오 회원가입 API',
    description:
      '로그인하고 쿠키를 전달한다. 회원가입이 되어있지않으면 회원가입 후 쿠키를 전달한다.',
  })
  @ApiResponse({
    status: 201,
    description: '카카오 로그인 또는 회원가입 성공',
  })
  @ApiResponse({
    status: 409,
    description: '이미 가입된 유저입니다.',
  })
  public async socialLoginController(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Get('')
  @ApiOperation({
    summary: '유저 정보 API',
    description: '유저의 정보를 가져온다',
  })
  @ApiResponse({
    status: 201,
    description: '유저 정보 불러오기 성공',
  })
  @ApiResponse({
    status: 404,
    description: '유저 정보가 존재하지 않습니다.',
  })
  public async getUserInfoController(@Request() req) {
    return this.usersService.getUserById(req.user.userId);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Patch('')
  @ApiOperation({
    summary: '유저 정보 수정 API',
    description: '유저 정보를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '유저 정보 수정 성공',
  })
  @ApiResponse({
    status: 404,
    description: '유저가 존재 하지 않습니다.',
  })
  @ApiResponse({
    status: 406,
    description: '수정할 유저 정보가 없습니다.',
  })
  public async changeUserInfoController(
    @Request() req,
    @Body() updateUserDto,
  ): Promise<void> {
    return this.usersService.modifyUser(req.user.userId, updateUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Get('family')
  @ApiOperation({
    summary: '가족 정보 API',
    description: '유저가 속한 가족의 정보를 가져온다',
  })
  @ApiResponse({
    status: 201,
    description: '가족 정보 불러오기 성공',
  })
  @ApiResponse({
    status: 404,
    description: '유저 정보가 존재하지 않습니다.',
  })
  public async getFamilyInfoController(@Request() req) {
    return this.usersService.getFamilyByFamilyId(req.user.familyId);
  }
}
