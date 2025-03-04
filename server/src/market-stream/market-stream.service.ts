import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { DrizzleClient } from 'src/database/database.module';
import { upbitSymbolSchema } from 'src/database/schema/upbit';
import { Interval } from '@nestjs/schedule';

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

  // @Interval(1000)
  // async processMarketData() {
  //   try {
  //     const premiumData: CoinPremiumData = {};

  //     // Get all ticker data from Redis
  //     const upbitKeys = await this.redisService.getKeys('ticker-upbit-*');

  //     // Process Upbit data
  //     for (const key of upbitKeys) {
  //       const data = await this.redisService.get(key);
  //       if (!data) continue;

  //       const tickerData = JSON.parse(data);
  //       const symbol = tickerData.baseToken;

  //       if (!premiumData[`${symbol}-${tickerData.quoteToken}`]) {
  //         premiumData[`${symbol}-${tickerData.quoteToken}`] = {};
  //       }

  //       premiumData[`${symbol}-${tickerData.quoteToken}`].upbit = {
  //         price: tickerData.price,
  //         timestamp: tickerData.timestamp,
  //         volume: tickerData.volume,
  //         change24h: tickerData.change24h,
  //       };
  //     }
  //     // Cache the premium data
  //     await this.redisService.set(
  //       this.PREMIUM_CACHE_KEY,
  //       JSON.stringify(premiumData),
  //     );

  //     // Emit the consolidated data
  //     this.appGateway.emitCoinPremium(premiumData);
  //   } catch (error) {
  //     this.logger.error('Error processing market data:', error);
  //   }
  // }

  async getMarketsFromDB() {
    try {
      const [upbitData] = await Promise.all([
        this.db.select().from(upbitSymbolSchema),
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

  async getForexRateFromRedis() {
    try {
      const [usdKrw, usdJpy, usdEur, usdGbp, usdCny] = await Promise.all([
        this.redisService.get('usd-krw-rate'),
        this.redisService.get('usd-jpy-rate'),
        this.redisService.get('usd-eur-rate'),
        this.redisService.get('usd-gbp-rate'),
        this.redisService.get('usd-cny-rate'),
      ]);

      return { usdKrw, usdJpy, usdEur, usdGbp, usdCny };
    } catch (error) {
      this.logger.error('Failed to get forex rate:', error);
      throw error;
    }
  }
}
