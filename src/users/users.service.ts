import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redis } from 'ioredis';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  public async signUp(createUserDto: CreateUserDto): Promise<void> {
    const provider = 'local';

    const checkUserDuplicated = await this.checkUserDuplicated(
      createUserDto.email,
      provider,
    );
    if (!checkUserDuplicated) {
      throw new ConflictException('이미 가입된 유저');
    }

    await this.createUserWithFamily(createUserDto, provider);
  }
  /**
   *
   * @param email
   * @returns
   */
  async getUserWithEmail(email: string): Promise<User> {
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
  async getUserWithId(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'provider', 'family'],
    });
    return user;
  }
  /**
   *
   * @param email
   * @returns
   */
  async getUserHashPasswordWithEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['password'],
    });
    return user;
  }

  async modifyUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { name, profile_image } = updateUserDto;
    const targetUser = await this.getUserWithId(id);
    if (!name) {
      targetUser.profile_image = profile_image;
    } else if (!targetUser) {
      targetUser.name = name;
    } else {
      targetUser.profile_image = profile_image;
      targetUser.name = name;
    }
    await this.userRepository.save(targetUser);
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
}
