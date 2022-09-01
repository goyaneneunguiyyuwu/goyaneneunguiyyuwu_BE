import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUser(email);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('존재 하지 않는 유저');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
}
// response는없습니다.
