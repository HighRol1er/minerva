import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { DrizzleClient } from 'src/database/database.module';
import { upbitSymbolSchema } from 'src/database/schema/upbit';
import { Interval } from '@nestjs/schedule';
import { REDIS_KEY } from 'src/common/constants';
import { AppGateway } from 'src/gateway/app.gateway';
import { ConsolidatedMarketData } from 'src/gateway/types/gateway.type';
import { STALE_TIME } from 'src/common/constants/stale-time';
import { FilterdMessageType } from 'src/collector/types';
@Injectable()
export class MarketStreamService implements OnModuleInit {
  private readonly logger = new Logger(MarketStreamService.name);

  constructor(
    private readonly appGateway: AppGateway,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    @Inject('DATABASE') private readonly db: typeof DrizzleClient,
  ) {}

  async onModuleInit() {
    // 개발 환경에서는 Redis 체크 건너뛰기
    // if (this.configService.get('NODE_ENV') === 'development') {
    //   this.logger.log('Development mode - skipping Redis connection check');
    //   return;
    // }

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

  @Interval(1000)
  async processMarketData() {
    try {
      const consolidatedMarketData: ConsolidatedMarketData = {};
      // Get all ticker data from Redis
      const upbitKeys = await this.redisService.getKeys(REDIS_KEY.UPBIT_KEY);
      const currentTimestamp = Date.now();
      // Process Upbit data
      for (const key of upbitKeys) {
        const data = await this.redisService.get(key);
        if (!data) continue;

        const symbolData: FilterdMessageType = JSON.parse(data);
        if (!symbolData) continue;
        // NOTE: 임시로 12시간 이상 지난 데이터는 삭제
        // 현재로서는 이렇게 냅두고 배포했을 때 어떻게 될지 좀 지켜봐야겠음
        // 이 로직으로 충분한지 아니면 더 세세하게 해야될지.
        // 지금은 보류
        if (
          currentTimestamp - Number(symbolData.timestamp) >
          STALE_TIME.HALF_DAY
        ) {
          await this.redisService.del(key);
          this.logger.log(`Deleted stale data for ${key}`);
          continue;
        }

        if (
          !consolidatedMarketData[
            `${symbolData.baseAsset}-${symbolData.quoteAsset}`
          ]
        ) {
          consolidatedMarketData[
            `${symbolData.baseAsset}-${symbolData.quoteAsset}`
          ] = {};
        }

        consolidatedMarketData[
          `${symbolData.baseAsset}-${symbolData.quoteAsset}`
        ].upbit = {
          price: symbolData.currentPrice,
          volume: symbolData.tradeVolume,
          change24h: symbolData.changeRate,
          timestamp: symbolData.timestamp,
        };
      }
      // Cache the premium data
      await this.redisService.set(
        REDIS_KEY.CONSOLIDATED_MARKET_DATA_KEY,
        JSON.stringify(consolidatedMarketData),
      );

      // Emit the consolidated data
      this.appGateway.emitConsolidatedMarketData(consolidatedMarketData);
    } catch (error) {
      this.logger.error('Error processing market data:', error);
    }
  }

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
