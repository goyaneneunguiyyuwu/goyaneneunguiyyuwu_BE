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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserInfoReqBody, ChangeUserInfoResponse } from 'src/types';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authentiacted.guard';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // todo: 이메일, 비밀번호 validation
  @Post('signup')
  @HttpCode(201)
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

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
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
    @Body() reqBody: ChangeUserInfoReqBody,
  ): Promise<ChangeUserInfoResponse> {
    return { statusCode: 201 };
  }
}
