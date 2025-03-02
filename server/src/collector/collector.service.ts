import { Inject, Injectable, Logger } from '@nestjs/common';
import { DrizzleClient } from 'src/database/database.module';
import { UpbitClient } from './clients/upbit.client';
import { ForexClient } from './clients/forex.client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { upbitSymbolSchema } from 'src/database/schema';
import { sql } from 'drizzle-orm';
@Injectable()
export class CollectorService {
  private readonly logger = new Logger(CollectorService.name);

  constructor(
    @Inject('DATABASE') private readonly db: typeof DrizzleClient,
    private readonly upbitClient: UpbitClient,
    // private readonly forexClient: ForexClient,
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
}
