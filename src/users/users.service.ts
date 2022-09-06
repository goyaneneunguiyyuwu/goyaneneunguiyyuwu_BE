import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redis } from 'ioredis';
import { Repository } from 'typeorm';
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
    const provider = 'local';

    const checkUserDuplicated = await this.checkUserDuplicated(
      userDto.email,
      provider,
    );
    if (!checkUserDuplicated) {
      throw new ConflictException('이미 가입된 유저');
    }

    await this.createUserWithFamily(userDto, provider);
  }
  /**
   *
   * @param email
   * @returns
   */
  async getUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'provider', 'family'],
    });
    return user;
  }
  /**
   *
   * @param email
   * @returns
   */
  async getUserWithHashPassword(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'provider', 'family', 'password'],
    });
    return user;
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
  private async createUserWithFamily(
    userDto: CreateUserDto,
    provider: 'local' | 'kakao',
  ): Promise<void> {
    const newUser = this.userRepository.create({ ...userDto, provider });
    const userRecord = await this.userRepository.save(newUser);

    const newFamily = this.familyRepository.create();
    newFamily.users = [userRecord];
    await this.familyRepository.save(newFamily);
  }
  /**
   *
   * @param email
   * @returns
   */
  private async checkUser(email: string): Promise<boolean> {
    const existedUser = await this.userRepository.findOne({ email });
    return existedUser ? true : false;
  }
}
