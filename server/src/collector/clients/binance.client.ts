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
import { binanceSymbolSchema } from 'src/database/schema/binance';
import { RedisService } from 'src/redis/redis.service';
import { binanceAssetSplitter } from 'src/common/utils/asset-splitter.util';
import { binanceMarketFilter } from 'src/common/utils/market-filter.util';
import { WebSocket } from 'ws';
import { BinanceSubscribeMessageType, FilterdMessageType } from '../types';
import {
  BinanceMarketResponse,
  BinanceSymbol,
} from '../types/api-market-response.type';
@Injectable()
export class BinanceClient implements OnModuleInit {
  protected readonly exchangeName = EXCHANGE_NAME.BINANCE;
  protected readonly logger = new Logger(BinanceClient.name);
  protected ws: WebSocket;
  protected reconnectAttempts = 0;
  protected reconnectDelay = WEBSOCKET_CONFIG.RECONNECT.DELAY;
  // endpoint
  protected readonly wsEndpoint = WEBSOCKET_ENDPOINTS.BINANCE;
  protected readonly apiEndpoint = API_ENDPOINTS.BINANCE;
  // market list
  protected marketList: string[] = []; // "BTC-KRW", "ETH-KRW", "XRP-KRW"

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
  public async fetchMarketData(): Promise<BinanceSymbol[]> {
    try {
      const response = await axios.get<BinanceMarketResponse>(this.apiEndpoint);
      const allMarkets: BinanceSymbol[] = response.data.symbols;

      this.marketList = binanceMarketFilter(allMarkets).map(
        (symbol) => symbol.symbol,
      );

      this.logger.log(`Fetch market data : ${this.exchangeName}`);

      // console.log('marketList', this.marketList);

      return allMarkets;
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

    const subscribeMessage: BinanceSubscribeMessageType = {
      method: 'SUBSCRIBE',
      params: symbolList.map((symbol) => `${symbol.toLowerCase()}@ticker`),
      id: 1,
    };

    this.ws.send(JSON.stringify(subscribeMessage));
  }

  private async parseMessage(data: Buffer) {
    try {
      const rawMessage = JSON.parse(data.toString());

      // Binance Websocket Validation
      // 구독 확인 메시지는 건너뛰기
      if (rawMessage.result === null && rawMessage.id === 1) {
        return;
      }

      // 실제 ticker 데이터만 처리
      if (!rawMessage.s) {
        // symbol이 없으면 건너뛰기
        return;
      }

      const { baseAsset, quoteAsset } = binanceAssetSplitter(rawMessage.s);
      const redisKey = `${EXCHANGE_NAME.BINANCE}-${baseAsset}-${quoteAsset}`;

      const filteredMessage: FilterdMessageType = {
        exchange: EXCHANGE_NAME.BINANCE,
        baseAsset,
        quoteAsset,
        symbol: rawMessage.s,
        currentPrice: rawMessage.c,
        changeRate: rawMessage.P,
        tradeVolume: rawMessage.q,
        timestamp: rawMessage.E,
      };
      // console.log('rawMessage', rawMessage);
      // console.log('filteredMessage', filteredMessage);
      await this.redisService.set(redisKey, JSON.stringify(filteredMessage));
    } catch (error) {
      this.logger.error(`Error parsing message data: ${error.message}`, {
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
        `Attempting to reconnect upbit... (attempt ${this.reconnectAttempts})`,
      );
      this.connect();
    }, delay);
  }

  // 웹소켓 재구독
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
  public async collectBinanceMarket() {
    try {
      this.logger.log('Collecting Binance tickers...');
      const allMarketData = await this.fetchMarketData();
      const newMarketData = binanceMarketFilter(allMarketData);

      // 현재 DB에 있는 마켓 데이터 조회
      const currentMarkets = await this.db
        .select({ currency_pair: binanceSymbolSchema.currency_pair })
        .from(binanceSymbolSchema);

      const currentMarketSet = new Set(
        currentMarkets.map((m) => m.currency_pair),
      );
      const newMarketSet = new Set(newMarketData.map((m) => m.symbol));

      // 상장 폐지된 마켓 찾기
      const delistedMarkets = currentMarkets
        .filter((market) => !newMarketSet.has(market.currency_pair))
        .map((market) => market.currency_pair);

      // 신규 상장된 마켓 찾기
      const newlyListedMarkets = newMarketData
        .filter((market) => !currentMarketSet.has(market.symbol))
        .map((market) => market.symbol);

      if (delistedMarkets.length > 0) {
        this.logger.log(
          `Delisted markets in Binance: ${delistedMarkets.join(', ')}`,
        );
      }
      if (newlyListedMarkets.length > 0) {
        this.logger.log(
          `Newly listed markets in Binance: ${newlyListedMarkets.join(', ')}`,
        );
      }

      // DB 업데이트 (신규 상장 및 업데이트)
      await this.db.transaction(async (tx) => {
        // 상장 폐지된 마켓 삭제
        if (delistedMarkets.length > 0) {
          await tx
            .delete(binanceSymbolSchema)
            .where(
              sql`${binanceSymbolSchema.currency_pair} IN ${delistedMarkets}`,
            );
        }

        // 신규 상장 및 업데이트
        for (const market of newMarketData) {
          const payload = {
            currency_pair: market.symbol,
            base_asset: market.baseAsset,
            quote_asset: 'USDT',
            trade_status: market.status,
            created_at: new Date(),
            updated_at: new Date(),
          };

          await tx
            .insert(binanceSymbolSchema)
            .values(payload)
            .onConflictDoUpdate({
              target: binanceSymbolSchema.currency_pair,
              set: { updated_at: new Date() },
            });
        }
      });

      // 변경사항이 있을 때만 WebSocket 갱신
      const hasChanges =
        delistedMarkets.length > 0 ||
        newMarketData.some((market) => !currentMarketSet.has(market.symbol));

      if (hasChanges) {
        this.logger.log(
          'Market list changed, refreshing WebSocket connection...',
        );
        await this.refreshSubscription();
      }

      this.logger.log('Successfully collected Binance tickers');
    } catch (error) {
      this.logger.error('Failed to collect Binance tickers', error);
      throw error;
    }
  }
}
