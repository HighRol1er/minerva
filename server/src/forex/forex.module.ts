import { Module } from '@nestjs/common';
import { ForexController } from './forex.controller';

@Module({
  controllers: [ForexController],
  providers: [],
})
export class ForexModule {}
