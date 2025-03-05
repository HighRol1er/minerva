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
import { bithumbSymbolSchema } from 'src/database/schema/bithumb';
import { binanceSymbolSchema } from 'src/database/schema/binance';
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

  // *****************
  // *   Broadcast   *
  // *****************

  @Interval(1000)
  async processMarketData() {
    try {
      const currentTimestamp = Date.now();
      const consolidatedMarketData: ConsolidatedMarketData = {};
      // Get all ticker data from Redis
      const upbitKeys = await this.redisService.getKeys(REDIS_KEY.UPBIT_KEY);
      const bithumbKeys = await this.redisService.getKeys(REDIS_KEY.BITHUMB_KEY);
      const binanceKeys = await this.redisService.getKeys(REDIS_KEY.BINANCE_KEY);
      // Process Upbit data
      for (const key of upbitKeys) {
        const data = await this.redisService.get(key);
        if (!data) continue;

        const upbitSymbolData: FilterdMessageType = JSON.parse(data);
        if (!upbitSymbolData) continue;
        // NOTE: 임시로 12시간 이상 지난 데이터는 삭제
        // 현재로서는 이렇게 냅두고 배포했을 때 어떻게 될지 좀 지켜봐야겠음
        // 이 로직으로 충분한지 아니면 더 세세하게 해야될지.
        // 지금은 보류
        if (currentTimestamp - Number(upbitSymbolData.timestamp) > STALE_TIME.HALF_DAY) {
          await this.redisService.del(key);
          this.logger.log(`Deleted stale data for ${key}`);
          continue;
        }

        if (!consolidatedMarketData[`${upbitSymbolData.baseAsset}-${upbitSymbolData.quoteAsset}`]) {
          consolidatedMarketData[`${upbitSymbolData.baseAsset}-${upbitSymbolData.quoteAsset}`] = {};
        }

        consolidatedMarketData[`${upbitSymbolData.baseAsset}-${upbitSymbolData.quoteAsset}`].upbit = {
          price: upbitSymbolData.currentPrice,
          volume: upbitSymbolData.tradeVolume,
          change24h: upbitSymbolData.changeRate,
          timestamp: upbitSymbolData.timestamp,
        };
      }
      // Process Bithumb data
      for (const key of bithumbKeys) {
        const data = await this.redisService.get(key);
        if (!data) continue;

        const bithumbSymbolData: FilterdMessageType = JSON.parse(data);
        if (!bithumbSymbolData) continue;

        if (currentTimestamp - Number(bithumbSymbolData.timestamp) > STALE_TIME.HALF_DAY) {
          await this.redisService.del(key);
          this.logger.log(`Deleted stale data for ${key}`);
          continue;
        }

        if (!consolidatedMarketData[`${bithumbSymbolData.baseAsset}-${bithumbSymbolData.quoteAsset}`]) {
          consolidatedMarketData[`${bithumbSymbolData.baseAsset}-${bithumbSymbolData.quoteAsset}`] = {};
        }

        consolidatedMarketData[`${bithumbSymbolData.baseAsset}-${bithumbSymbolData.quoteAsset}`].bithumb = {
          price: bithumbSymbolData.currentPrice,
          volume: bithumbSymbolData.tradeVolume,
          change24h: bithumbSymbolData.changeRate,
          timestamp: bithumbSymbolData.timestamp,
        };
      }
      // process Binance data
      for (const key of binanceKeys) {
        const data = await this.redisService.get(key);
        if (!data) continue;

        const binanceSymbolData: FilterdMessageType = JSON.parse(data);
        if (!binanceSymbolData) continue;

        if (currentTimestamp - Number(binanceSymbolData.timestamp) > STALE_TIME.HALF_DAY) {
          await this.redisService.del(key);
          this.logger.log(`Deleted stale data for ${key}`);
          continue;
        }

        if (!consolidatedMarketData[`${binanceSymbolData.baseAsset}-${binanceSymbolData.quoteAsset}`]) {
          consolidatedMarketData[`${binanceSymbolData.baseAsset}-${binanceSymbolData.quoteAsset}`] = {};
        }

        consolidatedMarketData[`${binanceSymbolData.baseAsset}-${binanceSymbolData.quoteAsset}`].binance = {
          price: binanceSymbolData.currentPrice,
          volume: binanceSymbolData.tradeVolume,
          change24h: binanceSymbolData.changeRate,
          timestamp: binanceSymbolData.timestamp,
        };
      }

      await this.redisService.set(REDIS_KEY.CONSOLIDATED_MARKET_DATA_KEY, JSON.stringify(consolidatedMarketData));

      // Emit the consolidated data
      this.appGateway.emitConsolidatedMarketData(consolidatedMarketData);
    } catch (error) {
      this.logger.error('Error processing market data:', error);
    }
  }

  async getMarketsFromDB() {
    try {
      const [upbitData, bithumbData, binanceData] = await Promise.all([
        this.db.select().from(upbitSymbolSchema),
        this.db.select().from(bithumbSymbolSchema),
        this.db.select().from(binanceSymbolSchema),
      ]);

      return {
        upbit: upbitData,
        bithumb: bithumbData,
        binance: binanceData,
      };
    } catch (error) {
      this.logger.error('Failed to get markets:', error);
      throw error;
    }
  }
  // *****************
  // *  FOREX_RATE   *
  // *****************
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
