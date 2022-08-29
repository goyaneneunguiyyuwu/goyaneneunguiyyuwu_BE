import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

//1
@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, PetsModule, PostsModule],
})
export class AppModule {}
