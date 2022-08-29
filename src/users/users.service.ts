import { Injectable } from '@nestjs/common';
import { CreateUserResponse } from 'types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  public async createUser(
    reqBody: CreateUserDto
    ): Promise<CreateUserResponse> {
      const statusCode = 400
    return { statusCode };
  }
}
