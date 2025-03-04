import { Controller, Get } from '@nestjs/common';
import { MarketStreamService } from './market-stream.service';

@Controller('market-stream')
export class MarketStreamController {
  constructor(private readonly marketStreamService: MarketStreamService) {}

  @Get('markets')
  async getMarket() {
    return this.marketStreamService.getMarketsFromDB();
  }

  @Get('forex-rate')
  async getForexRate() {
    return this.marketStreamService.getForexRateFromRedis();
  }
}
