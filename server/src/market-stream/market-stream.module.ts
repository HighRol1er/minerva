import { Module } from '@nestjs/common';
import { MarketStreamController } from './market-stream.controller';
import { MarketStreamService } from './market-stream.service';
import { AppGateway } from 'src/gateway/app.gateway';
@Module({
  controllers: [MarketStreamController],
  providers: [MarketStreamService, AppGateway],
})
export class MarketStreamModule {}
