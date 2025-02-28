import { Module } from '@nestjs/common';
import { ForexClient } from './clients/forex.client';
import { UpbitClient } from './clients/upbit.client';
import { CollectorService } from './collector.service';

@Module({
  providers: [UpbitClient, ForexClient, CollectorService],
  exports: [UpbitClient, ForexClient],
})
export class CollectorModule {}
