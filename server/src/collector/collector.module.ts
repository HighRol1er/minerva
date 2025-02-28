import { Module } from '@nestjs/common';
import { UpbitClient } from './clients/upbit.client';

@Module({
  providers: [UpbitClient],
  exports: [UpbitClient],
})
export class CollectorModule {}
