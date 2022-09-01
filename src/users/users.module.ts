import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Family } from './entities/family.entity';
import { RedisModule } from 'src/dependency/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Family]),
    RedisModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
