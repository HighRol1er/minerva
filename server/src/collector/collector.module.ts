import { Module } from '@nestjs/common';
import { ForexClient } from './clients/forex.client';
import { UpbitClient } from './clients/upbit.client';
import { CollectorService } from './collector.service';
import { BithumbClient } from './clients/bithumb.client';
import { BinanceClient } from './clients/binance.client';
@Module({
  providers: [
    ForexClient,
    CollectorService,
    UpbitClient,
    BithumbClient,
    BinanceClient,
  ],
  exports: [ForexClient, UpbitClient, BithumbClient, BinanceClient],
})
export class CollectorModule {}
