import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './users/entities/family.entity';
import { User } from './users/entities/user.entity';
import { Pet } from './pets/entities/pet.entity';

//1
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'petdiary',
      entities: [Family, User, Pet],
      synchronize: true,
    }),
    UsersModule,
    PetsModule,
  ],
})
export class AppModule {}
