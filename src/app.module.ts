import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './users/entities/family.entity';
import { User } from './users/entities/user.entity';
import { Pet } from './pets/entities/pet.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { LocalUser } from './users/entities/local.user.entity';
import { KakaoUser } from './users/entities/kakao.user.entity';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'petdiary',
      entities: [Family, User, Pet, LocalUser, KakaoUser],
      synchronize: true,
    }),
    UsersModule,
    PetsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
