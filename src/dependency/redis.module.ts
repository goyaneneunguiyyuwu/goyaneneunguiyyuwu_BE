import { Module } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  providers: [{ provide: 'REDIS', useValue: new Redis() }],
  exports: ['REDIS'],
})
export class RedisModule {}
