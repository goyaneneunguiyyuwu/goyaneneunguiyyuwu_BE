import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(email: string, password: string): Promise<User> {
    const localUser = await this.usersService.getLocalUserByEmail(email);
    const passwordValid = await bcrypt.compare(password, localUser.password);
    if (!localUser) {
      throw new NotAcceptableException('존재 하지 않는 유저');
    }
    if (localUser && passwordValid) {
      return localUser.user;
    }
    return null;
  }
}
// response는없습니다.
