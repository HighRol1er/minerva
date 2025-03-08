import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ActiveUsersData, ConsolidatedMarketData } from './types/gateway.type';
import { WS_EVENTS } from 'src/common/constants';
import { ForexRate } from 'src/collector/types';
@WebSocketGateway({
  cors: {
    // XXX: 현재 임시방편으로 CORS 해제함 추후 수정 필요
    // origin: [process.env.CLIENT_URL_DEV, process.env.CLIENT_URL_PROD],
    origin: '*',
    credentials: true,
  },
  transports: ['websocket'],
  path: '/socket.io/', // ws://localhost:3000/socket.io/로 접속
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
      this.logger.log(`Client connected: ${client.id}, Total connections: ${this.connectedClients.size}`);
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
    this.logger.log(`Client disconnected: ${client.id}. Total connections: ${this.connectedClients.size}`);
  }

  private emitActiveUsers() {
    const data: ActiveUsersData = { count: this.connectedClients.size };
    this.server.emit(WS_EVENTS.ACTIVE_USERS, data);
  }

  emitForexRate(data: ForexRate) {
    try {
      this.server.emit(WS_EVENTS.FOREX_RATE, data);
    } catch (error) {
      this.logger.error('Failed to emit exchange rate:', error);
    }
  }

  emitConsolidatedMarketData(data: ConsolidatedMarketData) {
    try {
      this.server.emit(WS_EVENTS.CONSOLIDATED_MARKET_DATA, data);
    } catch (error) {
      this.logger.error('Failed to emit consolidated market data:', error);
    }
  }
}
