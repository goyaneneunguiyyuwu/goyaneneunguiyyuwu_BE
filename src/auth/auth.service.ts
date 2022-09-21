import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { AuthPayload } from 'src/types';
import { KakaoUser } from 'src/users/entities/kakao.user.entity';
import { LocalUser } from 'src/users/entities/local.user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(email: string, password: string): Promise<AuthPayload> {
    const localUser = await this.usersService.getLocalUserByEmail(email);
    if (localUser === undefined)
      throw new NotFoundException('존재 하지 않는 유저입니다.');

    const passwordValid = await bcrypt.compare(password, localUser.password);
    if (passwordValid === false) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다');
    }

    const payload = this.generatePayload(localUser);

    return payload;
  }
  async validateKakaoUser(
    email: string,
    kakaoId: number,
  ): Promise<AuthPayload> {
    const kakaoUser = await this.usersService.getKakaoUserById(kakaoId);

    if (kakaoUser === undefined) {
      await this.usersService.kakaoSignUp(email, kakaoId);
      const newKakaoUser = await this.usersService.getKakaoUserById(kakaoId);
      const payload = this.generatePayload(newKakaoUser);
      return payload;
    }
    const payload = this.generatePayload(kakaoUser);
    return payload;
  }

  private generatePayload(user: KakaoUser | LocalUser): AuthPayload {
    const payload: AuthPayload = {
      userId: user.user.id,
      familyId: user.user.family.id,
      email: user.email,
    };
    return payload;
  }
}
// response는없습니다.
