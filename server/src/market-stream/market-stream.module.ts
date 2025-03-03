import { Module } from '@nestjs/common';
import { MarketStreamController } from './market-stream.controller';
import { MarketStreamService } from './market-stream.service';

@Module({
  controllers: [MarketStreamController],
  providers: [MarketStreamService]
})
export class MarketStreamModule {}
