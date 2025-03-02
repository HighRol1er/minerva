import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import {
  API_ENDPOINTS,
  EXCHANGE_NAME,
  WEBSOCKET_CONFIG,
  WEBSOCKET_ENDPOINTS,
} from 'src/common/constants';
import { RedisService } from 'src/redis/redis.service';
import { UpbitMarketResponse } from 'src/types/exchange-http';
import {
  UpbitRawMessage,
  UpbitSubscribeMessageType,
} from 'src/types/exchange-ws';
import { krExchangeAssetSplitter } from 'src/utils/asset-splitter.util';
import { krExchangeMarketFilter } from 'src/utils/market-filter.util';
import { formatChangeRate } from 'src/utils/number.util';
import { WebSocket } from 'ws';

@Injectable()
export class UpbitClient implements OnModuleInit {
  // exchange name
  protected readonly exchangeName = EXCHANGE_NAME.UPBIT;
  // logger
  protected readonly logger = new Logger(UpbitClient.name);
  // websocket
  protected ws: WebSocket;
  // reconnect
  protected reconnectAttempts = 0;
  protected reconnectDelay = WEBSOCKET_CONFIG.RECONNECT.DELAY;
  // endpoint
  protected readonly wsEndpoint = WEBSOCKET_ENDPOINTS.UPBIT;
  protected readonly apiEndpoint = API_ENDPOINTS.UPBIT;
  // market list
  protected marketList: string[] = []; // "BTC-KRW", "ETH-KRW", "XRP-KRW"

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    await this.fetchMarketData();
    await this.connect();
  }

  // *****************
  // *   REST_API    *
  // *****************
  public async fetchMarketData(): Promise<UpbitMarketResponse[]> {
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
    // symbolList가 없으면 시장 데이터 가져오기
    if (symbolList.length === 0) {
      await this.fetchMarketData();
    }

    const subscribeMessage: UpbitSubscribeMessageType = [
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
      const rawMessage: UpbitRawMessage = JSON.parse(data.toString());
      const { baseAsset, quoteAsset } = krExchangeAssetSplitter(rawMessage.cd);
      const redisKey = `${EXCHANGE_NAME.UPBIT}-${baseAsset}-${quoteAsset}`;

      const filteredMessage = {
        exchange: EXCHANGE_NAME.UPBIT,
        symbol: rawMessage.cd,
        currentPrice: rawMessage.tp,
        changeRate: formatChangeRate(rawMessage.scr),
        tradeVolume: rawMessage.atp24h,
      };

      // console.log('filteredMessage', filteredMessage);

      await this.redisService.set(redisKey, JSON.stringify(filteredMessage));
    } catch (error) {
      this.logger.error(`Error parsing message : ${error.message}`, {
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
}
