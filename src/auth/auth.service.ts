import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(email: string, password: string): Promise<User> {
    const localUser = await this.usersService.getLocalUserByEmail(email);
    if (localUser === undefined)
      throw new NotFoundException('존재 하지 않는 유저입니다.');
    const passwordValid = await bcrypt.compare(password, localUser.password);
    if (passwordValid === false) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다');
    }
    return localUser.user;
  }
  async validateKakaoUser(email: string, kakaoId: number): Promise<User> {
    const kakaoUser = await this.usersService.getKakaoUserById(kakaoId);
    if (kakaoUser === undefined) {
      await this.usersService.kakaoSignUp(email, kakaoId);
      const newKakaoUser = await this.usersService.getKakaoUserById(kakaoId);
      return newKakaoUser.user;
    }
    return kakaoUser.user;
  }
}
// response는없습니다.
