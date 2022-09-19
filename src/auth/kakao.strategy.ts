import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'kakaoId' });
  }
  async validate(email: string, kakaoId: number): Promise<any> {
    const user = await this.authService.validateKakaoUser(email, kakaoId);
    return user;
  }
}
