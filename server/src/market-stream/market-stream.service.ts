import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { DrizzleClient } from 'src/database/database.module';
import { upbitSymbolSchema } from 'src/database/schema/upbit';

@Injectable()
export class MarketStreamService implements OnModuleInit {
  private readonly logger = new Logger(MarketStreamService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    @Inject('DATABASE') private readonly db: typeof DrizzleClient,
  ) {}

  async onModuleInit() {
    // 개발 환경에서는 Redis 체크 건너뛰기
    if (this.configService.get('NODE_ENV') === 'development') {
      this.logger.log('Development mode - skipping Redis connection check');
      return;
    }

    try {
      const isConnected = await this.redisService.ping();
      if (!isConnected) {
        this.logger.warn('Redis connection check failed - continuing anyway');
        return;
      }
      this.logger.log('Redis connection check successful');
    } catch (error) {
      this.logger.warn('Failed to initialize ExchangeService:', error);
    }
  }

  async getMarkets() {
    try {
      const [upbitData] = await Promise.all([
        this.db.select().from(upbitSymbolSchema),
        // this.db.select().from(exchange_bithumb),
        // this.db.select().from(exchange_binance),
        // this.db.select().from(exchange_okx),
      ]);

      return {
        upbit: upbitData,
        // bithumb: bithumbData,
        // binance: binanceData,
        // okx: okxData,
      };
    } catch (error) {
      this.logger.error('Failed to get markets:', error);
      throw error;
    }
  }
}
