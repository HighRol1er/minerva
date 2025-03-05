import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { sql } from 'drizzle-orm';
import {
  API_ENDPOINTS,
  EXCHANGE_NAME,
  WEBSOCKET_CONFIG,
  WEBSOCKET_ENDPOINTS,
} from 'src/common/constants';
import { DrizzleClient } from 'src/database/database.module';
import { RedisService } from 'src/redis/redis.service';
import { krExchangeMarketFilter } from 'src/common/utils/market-filter.util';
import { WebSocket } from 'ws';
import { BithumbMarketResponse } from '../types/api-market-response.type';
import {
  BithumbRawMessage,
  BithumbSubscribeMessageType,
  FilterdMessageType,
} from '../types';
import { krExchangeAssetSplitter } from 'src/common/utils/asset-splitter.util';
import { formatChangeRate } from 'src/common/utils/number.util';
import { bithumbSymbolSchema } from 'src/database/schema/bithumb';
@Injectable()
export class BithumbClient implements OnModuleInit {
  protected readonly exchangeName = EXCHANGE_NAME.BITHUMB;
  protected readonly logger = new Logger(BithumbClient.name);
  protected ws: WebSocket;
  protected reconnectAttempts = 0;
  protected reconnectDelay = WEBSOCKET_CONFIG.RECONNECT.DELAY;
  // endpoint
  protected readonly wsEndpoint = WEBSOCKET_ENDPOINTS.BITHUMB;
  protected readonly apiEndpoint = API_ENDPOINTS.BITHUMB;
  // market list
  protected marketList: string[] = [];
  constructor(
    private readonly redisService: RedisService,
    @Inject('DATABASE') private readonly db: typeof DrizzleClient,
  ) {}

  async onModuleInit() {
    await this.fetchMarketData();
    await this.connect();
  }

  // *****************
  // *   REST_API    *
  // *****************
  public async fetchMarketData(): Promise<BithumbMarketResponse[]> {
    try {
      const { data } = await axios.get(this.apiEndpoint);
      this.marketList = krExchangeMarketFilter(data);
      this.logger.log(`Fetch market data : ${this.exchangeName}`);

      return data;
    } catch (error) {
      this.logger.error(
        `Error fetching market data : ${this.exchangeName}`,
        error,
      );
      throw error;
    }
  }

  getMarketList() {
    return this.marketList;
  }

  // *****************
  // *   WEBSOCKET   *
  // *****************
  protected async connect() {
    this.ws = new WebSocket(this.wsEndpoint);

    this.ws.on('open', async () => {
      this.logger.log(`Connected to ${this.exchangeName} websocket`);
      await this.subscribe();
    });

    this.ws.on('message', async (data: Buffer) => {
      await this.parseMessage(data);
    });

    this.ws.on('close', () => {
      this.logger.log(`Disconnected from ${this.exchangeName} websocket`);
      this.handleReconnect();
    });

    this.ws.on('error', (error) => {
      this.logger.error(`Error from ${this.exchangeName} websocket`, error);
      this.handleReconnect();
    });
  }

  private async subscribe(): Promise<void> {
    const symbolList = this.getMarketList();
    if (symbolList.length === 0) {
      await this.fetchMarketData();
    }
    const subscribeMessage: BithumbSubscribeMessageType = [
      { ticket: 'test' },
      {
        type: 'ticker',
        codes: symbolList,
      },
      { format: 'SIMPLE' },
    ];

    this.ws.send(JSON.stringify(subscribeMessage));
  }

  private async parseMessage(data: Buffer) {
    try {
      const rawMessage: BithumbRawMessage = JSON.parse(data.toString());
      const { baseAsset, quoteAsset } = krExchangeAssetSplitter(rawMessage.cd);
      const redisKey = `${EXCHANGE_NAME.BITHUMB}-${baseAsset}-${quoteAsset}`;

      const filteredMessage: FilterdMessageType = {
        exchange: EXCHANGE_NAME.BITHUMB,
        baseAsset,
        quoteAsset,
        symbol: rawMessage.cd,
        currentPrice: rawMessage.tp,
        changeRate: formatChangeRate(rawMessage.cr),
        tradeVolume: rawMessage.atp24h,
        timestamp: rawMessage.ttms,
      };

      // console.log('filtered Message', filteredMessage);

      await this.redisService.set(redisKey, JSON.stringify(filteredMessage));
    } catch (error) {
      this.logger.error(`Error parsing message : ${this.exchangeName}`, {
        data,
        error,
      });
    }
  }

  private handleReconnect() {
    // 무한 재시도 + 지수 백오프
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;

    setTimeout(() => {
      this.logger.log(
        `Attempting to reconnect ${this.exchangeName}... (attempt ${this.reconnectAttempts})`,
      );
      this.connect();
    }, delay);
  }

  public async refreshSubscription(): Promise<void> {
    this.logger.log(
      `Refreshing ${this.exchangeName} WebSocket subscription...`,
    );
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
    await this.connect();
  }

  // *****************
  // *  MARKET_DATA  *
  // *****************
  public async collectBithumbMarket() {
    try {
      this.logger.log('Collecting Bithumb tickers...');
      const allMarketData = await this.fetchMarketData();
      const newMarketData = allMarketData.filter((market) =>
        market.market.startsWith('KRW-'),
      );

      // 현재 DB에 있는 마켓 데이터 조회
      const currentMarkets = await this.db
        .select({ currency_pair: bithumbSymbolSchema.currency_pair })
        .from(bithumbSymbolSchema);

      const currentMarketSet = new Set(
        currentMarkets.map((m) => m.currency_pair),
      );
      const newMarketSet = new Set(newMarketData.map((m) => m.market));

      // 상장 폐지된 마켓 찾기
      const delistedMarkets = currentMarkets
        .filter((market) => !newMarketSet.has(market.currency_pair))
        .map((market) => market.currency_pair);

      const newlyListedMarkets = newMarketData
        .filter((market) => !currentMarketSet.has(market.market))
        .map((market) => market.market);

      // new/delisted market log
      if (delistedMarkets.length > 0) {
        this.logger.log(
          `Delisted markets in Bithumb: ${delistedMarkets.join(', ')}`,
        );
      }
      if (newlyListedMarkets.length > 0) {
        this.logger.log(
          `Newly listed markets in Bithumb: ${newlyListedMarkets.join(', ')}`,
        );
      }

      // DB 업데이트 (신규 상장 및 업데이트)
      await this.db.transaction(async (tx) => {
        // 상장 폐지된 마켓 삭제
        if (delistedMarkets.length > 0) {
          await tx
            .delete(bithumbSymbolSchema)
            .where(
              sql`${bithumbSymbolSchema.currency_pair} IN ${delistedMarkets}`,
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
            .insert(bithumbSymbolSchema)
            .values(payload)
            .onConflictDoUpdate({
              target: bithumbSymbolSchema.currency_pair,
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
        await this.refreshSubscription();
      }
    } catch (error) {
      this.logger.error('Failed to store bithumb market data', error);
    }
  }
}
