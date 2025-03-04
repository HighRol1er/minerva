import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ActiveUsersData } from './types/gateway.type';
import { WS_EVENTS } from 'src/common/constants';
import { ForexRate } from 'src/collector/types';
@WebSocketGateway({
  cors: {
    origin: [process.env.CLIENT_URL_DEV, process.env.CLIENT_URL_PROD],
    credentials: true,
  },
  transports: ['websocket'], // TODO: 추후 polling 적용
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
    this.server.emit(WS_EVENTS.ACTIVE_USERS, data);
  }

  emitForexRate(data: ForexRate) {
    try {
      this.server.emit(WS_EVENTS.FOREX_RATE, data);
    } catch (error) {
      this.logger.error('Failed to emit exchange rate:', error);
    }
  }

  // TODO: 이벤트 이름 별로임
  // 코인데이터를 전송하는 이벤트가 될거같음 market-stream작성하면서 바꿀 예정
  emitCoinPremium(data: any) {
    try {
      this.server.emit(WS_EVENTS.COIN_PREMIUM, data);
    } catch (error) {
      this.logger.error('Failed to emit coin premium:', error);
    }
  }
}
