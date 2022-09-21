import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Family } from 'src/users/entities/family.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    TypeOrmModule.forFeature([Family]),
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
