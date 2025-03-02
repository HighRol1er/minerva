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
        this.collectUpbitMarket(),
        // ... 다른 거래소
      ]);
      this.logger.log('Successfully collected market data from all exchanges');
    } catch (error) {
      this.logger.error('Failed to collect market data', error);
      throw error;
    }
  }

  private async collectUpbitMarket() {
    try {
      this.logger.log('Collecting Upbit tickers...');
      const allMarketData = await this.upbitClient.fetchMarketData();
      const newMarketData = allMarketData.filter((market) =>
        market.market.startsWith('KRW-'),
      );

      // 현재 DB에 있는 마켓 데이터 조회
      const currentMarkets = await this.db
        .select({ currency_pair: upbitSymbolSchema.currency_pair })
        .from(upbitSymbolSchema);

      const currentMarketSet = new Set(
        currentMarkets.map((m) => m.currency_pair),
      );
      const newMarketSet = new Set(newMarketData.map((m) => m.market));

      // 상장 폐지된 마켓 찾기
      const delistedMarkets = currentMarkets
        .filter((market) => !newMarketSet.has(market.currency_pair))
        .map((market) => market.currency_pair);

      // 신규 상장된 마켓 찾기
      const newlyListedMarkets = newMarketData
        .filter((market) => !currentMarketSet.has(market.market))
        .map((market) => market.market);

      // new/delisted market log
      if (delistedMarkets.length > 0) {
        this.logger.log(
          `Delisted markets in Upbit: ${delistedMarkets.join(', ')}`,
        );
      }
      if (newlyListedMarkets.length > 0) {
        this.logger.log(
          `Newly listed markets in Upbit: ${newlyListedMarkets.join(', ')}`,
        );
      }

      // DB 업데이트 (신규 상장 및 업데이트)
      await this.db.transaction(async (tx) => {
        // 상장 폐지된 마켓 삭제
        if (delistedMarkets.length > 0) {
          await tx
            .delete(upbitSymbolSchema)
            .where(
              sql`${upbitSymbolSchema.currency_pair} IN ${delistedMarkets}`,
            );
        }

        // 신규 상장 및 업데이트
        for (const market of newMarketData) {
          const payload = {
            currency_pair: market.market,
            korean_name: market.korean_name,
            english_name: market.english_name,
            base_asset: market.market.split('-')[1],
            quote_asset: market.market.split('-')[0],
            created_at: new Date(),
            updated_at: new Date(),
          };

          await tx
            .insert(upbitSymbolSchema)
            .values(payload)
            .onConflictDoUpdate({
              target: upbitSymbolSchema.currency_pair,
              set: { updated_at: new Date() },
            });
        }
      });

      // 변경사항이 있을 때만 WebSocket 갱신
      const hasChanges =
        delistedMarkets.length > 0 ||
        newMarketData.some((market) => !currentMarketSet.has(market.market));

      if (hasChanges) {
        this.logger.log(
          'Market list changed, refreshing WebSocket connection...',
        );
        await this.upbitClient.refreshSubscription();
      }

      this.logger.log('Successfully collected Upbit tickers');
    } catch (error) {
      this.logger.error('Failed to collect Upbit tickers', error);
      throw error;
    }
  }
}
