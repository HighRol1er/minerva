import { Controller, Get } from '@nestjs/common';
import { MarketStreamService } from './market-stream.service';

@Controller('market-stream')
export class MarketStreamController {
  constructor(private readonly marketStreamService: MarketStreamService) {}

  // @Get('market')
  // async getMarket() {
  //   return this.marketStreamService.getMarket();
  // }

  // @Get('forex-rate')
  // async getForexRate() {
  //   return this.marketStreamService.getForexRate();
  // }
}
