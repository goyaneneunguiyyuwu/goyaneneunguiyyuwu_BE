import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<void> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      // 정확한 표현일까 테스트 코드로 확인해보자
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다');
    }
    return;
  }
}
