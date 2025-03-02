import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
@Injectable()
export class BithumbClient {
  constructor(private readonly redisService: RedisService) {}
}
