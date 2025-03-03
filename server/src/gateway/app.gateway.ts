import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ActiveUsersData {
  count: number;
}

interface ExchangeRateData {
  rate: number;
  timestamp: number;
}

// XXX: 수정 필요
export interface ExchangeTickerData {
  price: number;
  timestamp: number;
  volume: number;
  change24h: number;
}
// XXX: 수정 필요
export interface CoinPremiumData {
  [symbol: `${string}-${string}`]: {
    upbit?: ExchangeTickerData;
    binance?: ExchangeTickerData;
    bithumb?: ExchangeTickerData;
    coinone?: ExchangeTickerData;
    okx?: ExchangeTickerData;
  };
}

@WebSocketGateway({
  cors: {
    origin: [process.env.CLIENT_URL_DEV, process.env.CLIENT_URL_PROD],
    credentials: true,
  },
  transports: ['websocket'],
  path: '/socket.io/',
  pingInterval: 1000,
  pingTimeout: 3000,
  maxHttpBufferSize: 1e6,
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AppGateway.name);
  private connectedClients: Set<string> = new Set();

  async handleConnection(client: Socket) {
    try {
      // 클라이언트 ID를 Set에 추가
      this.connectedClients.add(client.id);
      this.emitActiveUsers();
      this.logger.log(
        `Client connected: ${client.id}, Total connections: ${this.connectedClients.size}`,
      );
    } catch (error) {
      this.logger.error('Connection handling failed:', error);
      // 에러가 발생해도 연결은 유지
      this.connectedClients.add(client.id);
      this.emitActiveUsers();
    }
  }

  handleDisconnect(client: Socket) {
    // 클라이언트 ID를 Set에서 제거
    this.connectedClients.delete(client.id);
    this.emitActiveUsers();
    this.logger.log(
      `Client disconnected: ${client.id}. Total connections: ${this.connectedClients.size}`,
    );
  }

  private emitActiveUsers() {
    const data: ActiveUsersData = { count: this.connectedClients.size };
    this.server.emit('active-users', data);
  }

  emitExchangeRate(data: ExchangeRateData) {
    this.server.emit('exchange-rate', data);
  }

  emitCoinPremium(data: CoinPremiumData) {
    this.server.emit('coin-premium', data);
  }
}
