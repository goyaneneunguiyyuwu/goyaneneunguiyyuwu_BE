import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Family } from './entities/family.entity';
import { RedisModule } from 'src/dependency/redis.module';
import { LocalUser } from './entities/local.user.entity';
import { KakaoUser } from './entities/kakao.user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Family]),
    TypeOrmModule.forFeature([LocalUser]),
    TypeOrmModule.forFeature([KakaoUser]),
    RedisModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
