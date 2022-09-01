import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redis } from 'ioredis';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Family } from './entities/family.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Family)
    private familyRepository: Repository<Family>,
    @Inject('REDIS')
    private redis: Redis,
  ) {}

  /**
   *
   * @param userDto
   */
  public async signUp(userDto: CreateUserDto): Promise<void> {
    try {
      const { email, name, password, provider } = userDto;

      const checkUserDuplicated = await this.checkUserDuplicated(
        email,
        provider,
      );
      if (!checkUserDuplicated) {
        throw new ConflictException('이미 가입된 유저');
      }

      await this.createUserWithFamily(userDto);
    } catch (err) {
      console.log(err);
      throw new Error('알수없는 이유로 회원에 가입 실패');
    }
  }

  public async signIn(authDto: AuthDto): Promise<void> {
    const { email, password } = authDto;
    const existedUser = await this.checkUser(email);
    if (!existedUser) throw new NotFoundException('존재 하지 않는 유저');
    return 
  }

  /**
   *
   * @param email
   * @param provider
   */
  private async checkUserDuplicated(
    email: string,
    provider: string,
  ): Promise<boolean> {
    const usersHasSameEmail = await this.userRepository.find({ email });

    if (usersHasSameEmail.length === 0) return true;
    usersHasSameEmail.filter(user => user.provider === provider).length > 0
      ? false
      : true;
  }
  /**
   * @param userDto
   */
  private async createUserWithFamily(userDto: CreateUserDto): Promise<void> {
    const newUser = this.userRepository.create(userDto);
    const userRecord = await this.userRepository.save(newUser);

    const newFamily = this.familyRepository.create();
    newFamily.users = [userRecord];
    await this.familyRepository.save(newFamily);
  }

  private async checkUser(email: string): Promise<boolean> {
    const existedUser = this.userRepository.findOne({ email });
    return existedUser ? true : false;
  }
}
