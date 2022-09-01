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
import { ChangeUserInfoResponse, loginDto } from 'src/types';
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
  public async signUpController(@Body() userDto: CreateUserDto): Promise<void> {
    return this.usersService.signUp(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
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
  @ApiBody({ type: loginDto })
  public async localLoginController(@Request() req): Promise<string> {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  @ApiOperation({
    summary: 'authorization 실험용',
    description: '쿠키 auth 실험용',
  })
  @ApiCookieAuth()
  public async protected(@Request() req): Promise<string> {
    return req.user;
  }

  @Get('kakao')
  @ApiResponse({
    status: 201,
    description: '카카오 로그인 성공',
  })
  @ApiResponse({
    status: 403,
    description: '카카오 로그인 실패',
  })
  public async socialLoginController() {}

  @Get('info')
  @ApiResponse({
    status: 201,
    description: '유저 정보 불러오기 성공',
  })
  @ApiResponse({
    status: 403,
    description: '유저 정보 불러오기 실패',
  })
  public async getUserInfoController() {}

  // 첫번째, 로그인할때 이름수정만 필수로 입력하게해야함
  @Patch('info/change')
  @ApiResponse({
    status: 201,
    description: '유저 정보 수정 성공',
  })
  @ApiResponse({
    status: 403,
    description: '유저 정보 수정 실패',
  })
  public async changeUserInfoController(
    @Body() reqBody,
  ): Promise<ChangeUserInfoResponse> {
    return { statusCode: 201 };
  }
}
