import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { sql } from 'drizzle-orm';
import { DrizzleClient } from 'src/database/database.module';
import { forexRatesSchema } from 'src/database/schema';
import { RedisService } from 'src/redis/redis.service';
import { ForexClient } from './clients/forex.client';
import { UpbitClient } from './clients/upbit.client';
import { ForexRate } from './types';
import { AppGateway } from 'src/gateway/app.gateway';
@Injectable()
export class CollectorService {
  private readonly logger = new Logger(CollectorService.name);

  constructor(
    @Inject('DATABASE') private readonly db: typeof DrizzleClient,
    private readonly redisService: RedisService,
    private readonly appGateway: AppGateway,
    private readonly forexClient: ForexClient,
    private readonly upbitClient: UpbitClient,
  ) {}

  // @Cron(CronExpression.EVERY_10_SECONDS) // TEST
  @Cron(CronExpression.EVERY_HOUR)
  async collectMarketData() {
    try {
      await Promise.all([
        this.upbitClient.collectUpbitMarket(),
        // ... 다른 거래소
      ]);
      this.logger.log('Successfully collected market data from all exchanges');
    } catch (error) {
      this.logger.error('Failed to collect market data', error);
      throw error;
    }
  }

  // TODO: 현재 Redis에 저장 뿐 아니라 boardcast도 하고 있어서 추후 리팩토링 해야 함
  // @Cron('*/60 * * * * *') // PROD
  @Cron(CronExpression.EVERY_10_SECONDS) // TEST
  async collectForexRate() {
    try {
      const exchangeRates = await Promise.allSettled([
        this.forexClient.fetchUsdKrwRate(),
        this.forexClient.fetchUsdJpyRate(),
        this.forexClient.fetchUsdEurRate(),
        this.forexClient.fetchUsdGbpRate(),
        this.forexClient.fetchUsdCnyRate(),
      ]);

      const redisPromises: Promise<void>[] = [];
      const currencies = ['krw', 'jpy', 'eur', 'gbp', 'cny'];
      const forexData: ForexRate = {
        usdKrw: null,
        usdJpy: null,
        usdEur: null,
        usdGbp: null,
        usdCny: null,
        timestamp: Date.now(),
      };

      exchangeRates.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const rate = result.value.toString();
          redisPromises.push(
            this.redisService.set(`usd-${currencies[index]}-rate`, rate, 300),
          );
          forexData[
            `usd${currencies[index].replace(/^[a-z]/, (c) => c.toUpperCase())}`
          ] = rate;
        } else {
          this.logger.warn(
            `Failed to fetch ${currencies[index]} rate: ${result.reason}`,
          );
        }
      });

      await Promise.all(redisPromises);
      this.appGateway.emitForexRate(forexData);
    } catch (error) {
      this.logger.error(
        'Unexpected error occurred while collecting exchange rate',
        error.stack || error,
      );
      throw error;
    }
  }

  // 환율 데이터 DB에 저장
  @Cron(CronExpression.EVERY_HOUR) // PROD
  // @Cron(CronExpression.EVERY_10_SECONDS) // TEST
  async storeForexRateHistory() {
    try {
      const [usdKrwRate, usdJpyRate, usdEurRate, usdGbpRate, usdCnyRate] =
        await Promise.all([
          this.forexClient.fetchUsdKrwRate(),
          this.forexClient.fetchUsdJpyRate(),
          this.forexClient.fetchUsdEurRate(),
          this.forexClient.fetchUsdGbpRate(),
          this.forexClient.fetchUsdCnyRate(),
        ]);

      const payloads = [
        {
          currency_pair: 'USD-KRW',
          rate: usdKrwRate.toString(),
          timestamp: new Date(),
        },
        {
          currency_pair: 'USD-JPY',
          rate: usdJpyRate.toString(),
          timestamp: new Date(),
        },
        {
          currency_pair: 'USD-EUR',
          rate: usdEurRate.toString(),
          timestamp: new Date(),
        },
        {
          currency_pair: 'USD-GBP',
          rate: usdGbpRate.toString(),
          timestamp: new Date(),
        },
        {
          currency_pair: 'USD-CNY',
          rate: usdCnyRate.toString(),
          timestamp: new Date(),
        },
      ];

      // 각 통화쌍별로 최신 데이터만 유지하도록 upsert 사용
      await this.db
        .insert(forexRatesSchema)
        .values(payloads)
        .onConflictDoUpdate({
          target: forexRatesSchema.currency_pair,
          set: {
            rate: sql`EXCLUDED.rate`,
            timestamp: sql`EXCLUDED.timestamp`,
          },
        });

      this.logger.log(
        'Successfully updated forex rates for all currency pairs',
      );
    } catch (error) {
      this.logger.error('Failed to store forex rate history', error);
    }
  }
}
