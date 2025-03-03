import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from './config/config.module';
import { CollectorModule } from './collector/collector.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MarketStreamModule } from './market-stream/market-stream.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    DatabaseModule,
    RedisModule,
    GatewayModule,
    CollectorModule,
    MarketStreamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
