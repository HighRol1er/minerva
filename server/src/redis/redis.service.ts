import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name);
  private client: RedisClientType;

  constructor(private configService: ConfigService) {
    const host =
      this.configService.get('NODE_ENV') === 'production'
        ? this.configService.get('REDIS_HOST', 'redis')
        : 'localhost';

    this.client = createClient({
      url: `redis://${host}:${this.configService.get('REDIS_PORT', '6379')}`,
    });
  }

  async onModuleInit() {
    try {
      await this.client.connect();
      this.logger.log('Redis connected successfully');
    } catch (error) {
      // 개발 환경에서는 에러 로깅을 생략
      if (this.configService.get('NODE_ENV') === 'development') {
        this.logger.log(
          'Redis is in development mode - continuing without Redis',
        );
        return;
      }
      // 프로덕션 환경에서는 에러를 출력하고 throw
      this.logger.error('Redis connection failed:', error);
      throw error;
    }
  }

  // Redis 연결 상태 확인
  async ping(): Promise<boolean> {
    try {
      const result = await this.client.ping();
      return result === 'PONG';
    } catch (error) {
      this.logger.error('Redis ping failed:', error);
      return false;
    }
  }

  // Redis 데이터 저장
  async set(key: string, value: string, ttl?: number) {
    try {
      if (ttl) {
        await this.client.set(key, value, { EX: ttl });
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      this.logger.error('Redis set failed:', error);
      // Redis 작업 실패 조용히 처리
    }
  }

  async get(key: string) {
    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.error('Redis get failed:', error);
      return null;
    }
  }

  // Redis 키 목록 조회
  async getKeys(pattern: string) {
    try {
      return await this.client.keys(pattern);
    } catch (error) {
      this.logger.error('Redis getKeys failed:', error);
      return [];
    }
  }

  // Redis 키 목록 디버깅
  async debugKeys(pattern: string) {
    try {
      const keys = await this.client.keys(pattern);
      const values = await Promise.all(
        keys.map(async (key) => {
          const value = await this.client.get(key);
          return { key, value };
        }),
      );
      return values;
    } catch (error) {
      this.logger.error('Redis debugKeys failed:', error);
      return [];
    }
  }

  // 모든 데이터 삭제
  async flushAll() {
    try {
      await this.client.flushAll();
      this.logger.log('Successfully flushed all Redis data');
    } catch (error) {
      this.logger.error('Redis flushAll failed:', error);
    }
  }

  // 특정 키 삭제
  async del(...keys: string[]) {
    try {
      await this.client.del(keys);
      this.logger.log(`Successfully deleted keys: ${keys.join(', ')}`);
    } catch (error) {
      this.logger.error('Redis del failed:', error);
    }
  }

  // 연결 종료
  async close() {
    try {
      await this.client.quit();
      this.logger.log('Redis connection closed successfully');
    } catch (error) {
      this.logger.error('Redis close failed:', error);
    }
  }
}
