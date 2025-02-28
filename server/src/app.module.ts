import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForexModule } from './forex/forex.module';
import { GatewayModule } from './gateway/gateway.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from './config/config.module';
import { CollectorModule } from './collector/collector.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RedisModule,
    GatewayModule,
    CollectorModule,
    ForexModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
