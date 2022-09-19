import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redis } from 'ioredis';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Family } from './entities/family.entity';
import { KakaoUser } from './entities/kakao.user.entity';
import { LocalUser } from './entities/local.user.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Family)
    private familyRepository: Repository<Family>,
    @InjectRepository(LocalUser)
    private localUserRepository: Repository<LocalUser>,
    @InjectRepository(KakaoUser)
    private kakaoUserRepository: Repository<KakaoUser>,
    @Inject('REDIS')
    private redis: Redis,
  ) {}

  /**
   *
   * @param {CreateUserDto} createUserDto
   */
  public async localSignUp(createUserDto: CreateUserDto): Promise<void> {
    const checkUserDuplicated = await this.checkLocalUserDuplicated(
      createUserDto.email,
    );
    if (!checkUserDuplicated) {
      throw new ConflictException('이미 가입된 유저');
    }
    await this.createLocalUserWithFamily(createUserDto);
  }

  /**
   *
   * @param {string} email
   * @param {string} name
   * @param {number} kakaoId
   */
  public async kakaoSignUp(
    email: string,
    name: string,
    kakaoId: number,
  ): Promise<void> {
    const checkUserDuplicated = await this.checkKakaoUserDuplicated(kakaoId);
    if (!checkUserDuplicated) {
      throw new ConflictException('이미 가입된 유저');
    }
    await this.createKaKaoUserWithFamily(email, name, kakaoId);
  }
  /**
   * 22.09.07 localUser의 fk로 userId를 전달해주기 때문에, 해당 정보를 client로 전달해주어, user정보를 pk인 userid로 indexing할 수 있어 좀 더 성능개선이 이루어졌다.
   *
   * @param {number} userId
   * @returns {Promise<User>}
   */
  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'name', 'profileImage'],
      relations: ['family'],
    });
    return user;
  }
  /**
   * 22.09.07 localUser entity는 email을 pk로 가지고 있기 때문에 기존의 user의 email 검색보다 성능이 개선되었다.
   *
   * @param {string} email
   * @returns {Promise<LocalUser>}
   */
  async getLocalUserByEmail(email: string): Promise<LocalUser> {
    const localUser = await this.localUserRepository.findOne({
      where: { email },
      select: ['email', 'password'],
      relations: ['user'],
    });
    return localUser;
  }
  async getKakaoUserById(kakaoId: number): Promise<KakaoUser> {
    const kakaoUser = await this.kakaoUserRepository.findOne({
      where: { kakaoId },
      select: ['email', 'kakaoId'],
      relations: ['user'],
    });
    return kakaoUser;
  }

  /**
   *
   * @param {number} userId
   * @param {UpdateUserDto} updateUserDto
   */
  async modifyUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const { name, profileImage } = updateUserDto;
    const targetUser = await this.getUserById(userId);
    if (!name) {
      targetUser.profileImage = profileImage;
    } else if (!targetUser) {
      targetUser.name = name;
    } else {
      targetUser.profileImage = profileImage;
      targetUser.name = name;
    }
    await this.userRepository.save(targetUser);
  }

  /**
   *
   * @param {string} email
   * @returns {boolean}
   */
  private async checkLocalUserDuplicated(email: string): Promise<boolean> {
    const usersHasSameEmail = await this.localUserRepository.find({ email });
    return usersHasSameEmail.length === 0 ? true : false;
  }
  private async checkKakaoUserDuplicated(kakaoId: number): Promise<boolean> {
    const usersHasSameEmail = await this.kakaoUserRepository.find({ kakaoId });
    return usersHasSameEmail.length === 0 ? true : false;
  }
  /**
   * @param {CreateUserDto} createUserDto
   */
  private async createLocalUserWithFamily(
    createUserDto: CreateUserDto,
  ): Promise<void> {
    try {
      const { email, password } = createUserDto;
      const newUser = this.userRepository.create({ email });
      const userRecord = await this.userRepository.save(newUser);

      const newFamily = this.familyRepository.create();
      newFamily.users = [userRecord];
      await this.familyRepository.save(newFamily);
      const newLocalUser = this.localUserRepository.create({ email, password });
      newLocalUser.user = userRecord;
      await this.localUserRepository.save(newLocalUser);
    } catch (err) {
      console.log(err);
    }
  }
  /**
   *
   * @param {string} email
   * @param {number} kakaoId
   */
  private async createKaKaoUserWithFamily(
    email: string,
    kakaoId: number,
  ): Promise<void> {
    try {
      const newUser = this.userRepository.create({ email });
      const userRecord = await this.userRepository.save(newUser);

      const newFamily = this.familyRepository.create();
      newFamily.users = [userRecord];
      await this.familyRepository.save(newFamily);

      const newKakaoUser = this.kakaoUserRepository.create({ kakaoId, email });
      newKakaoUser.user = userRecord;
      await this.kakaoUserRepository.save(newKakaoUser);
    } catch (err) {
      console.log(err);
    }
  }
}
