import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class MarketStreamService implements OnModuleInit {
  private readonly logger = new Logger(MarketStreamService.name);

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {}
}
