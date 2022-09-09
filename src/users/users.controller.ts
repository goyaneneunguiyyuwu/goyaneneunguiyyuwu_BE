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
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authentiacted.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // todo: 이메일, 비밀번호 validation
  @Post('signup')
  @HttpCode(201)
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다' })
  @ApiResponse({
    status: 201,
    description: '유저 회원가입 완료',
  })
  @ApiResponse({
    status: 403,
    description: '유저 회원가입 실패',
  })
  public async signUpController(
    @Body() createUserDto: CreateUserDto,
  ): Promise<void> {
    return this.usersService.localSignUp(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LocalLoginDto })
  @ApiOperation({
    summary: '로그인 API',
    description: '로그인하고 쿠키를 전달한다.',
  })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
  })
  @ApiResponse({
    status: 403,
    description: '로그인 실패',
  })
  public async localLoginController(@Request() req): Promise<string> {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('kakao')
  @ApiBody({ type: KakaoLoginDto })
  @ApiResponse({
    status: 201,
    description: '카카오 로그인 성공',
  })
  @ApiResponse({
    status: 403,
    description: '카카오 로그인 실패',
  })
  public async socialLoginController(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Get('info')
  @ApiOperation({
    summary: '유저 정보 API',
    description: '유저의 정보를 가져온다',
  })
  @ApiResponse({
    status: 201,
    description: '유저 정보 불러오기 성공',
  })
  @ApiResponse({
    status: 400,
    description: '유저 정보 불러오기 실패',
  })
  public async getUserInfoController(@Request() req) {
    return this.usersService.getUserById(req.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Patch('info')
  @ApiResponse({
    status: 201,
    description: '유저 정보 수정 성공',
  })
  @ApiResponse({
    status: 403,
    description: '유저 정보 수정 실패',
  })
  public async changeUserInfoController(
    @Request() req,
    @Body() updateUserDto,
  ): Promise<void> {
    return this.usersService.modifyUser(req.user.id, updateUserDto);
  }
}
