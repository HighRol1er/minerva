import { Module } from '@nestjs/common';
import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';

@Module({
  controllers: [ForexController],
  providers: [ForexService]
})
export class ForexModule {}
