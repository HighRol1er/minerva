import { Test, TestingModule } from '@nestjs/testing';
import { CollectorService } from '../collector.service';
import { RedisService } from 'src/redis/redis.service';
import { ForexClient } from '../clients/forex.client';
import { UpbitClient } from '../clients/upbit.client';
import { DrizzleClient } from 'src/database/database.module';

describe('CollectorService Performance Test', () => {
  let service: CollectorService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectorService,
        {
          provide: RedisService,
          useValue: {
            set: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: ForexClient,
          useValue: {
            fetchUsdKrwRate: jest.fn().mockResolvedValue(1300),
            fetchUsdJpyRate: jest.fn().mockResolvedValue(150),
            fetchUsdEurRate: jest.fn().mockResolvedValue(0.92),
            fetchUsdGbpRate: jest.fn().mockResolvedValue(0.79),
            fetchUsdCnyRate: jest.fn().mockResolvedValue(7.2),
          },
        },
        {
          provide: UpbitClient,
          useValue: {},
        },
        {
          provide: 'DATABASE',
          useValue: DrizzleClient,
        },
      ],
    }).compile();

    service = module.get<CollectorService>(CollectorService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should compare forEach vs map performance with larger dataset', async () => {
    const iterations = 1000; // 10000에서 1000으로 감소
    const dataSize = 100; // 1000에서 100으로 감소
    const results = {
      forEach: [] as number[],
      map: [] as number[],
    };

    // 더 큰 데이터셋 생성
    const generateLargeDataset = () => {
      return Array.from({ length: dataSize }, (_, i) => ({
        status: 'fulfilled' as const,
        value: Math.random() * 1000,
      }));
    };

    // forEach 테스트
    for (let i = 0; i < iterations; i++) {
      const dataset = generateLargeDataset();
      const start = performance.now();

      const redisPromises: Promise<void>[] = [];
      dataset.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          redisPromises.push(
            redisService.set(`test-key-${index}`, result.value.toString(), 300),
          );
        }
      });
      await Promise.all(redisPromises);

      const end = performance.now();
      results.forEach.push(end - start);
    }

    // map 테스트
    for (let i = 0; i < iterations; i++) {
      const dataset = generateLargeDataset();
      const start = performance.now();

      const redisPromises = dataset
        .map((result, index) => {
          if (result.status === 'fulfilled') {
            return redisService.set(
              `test-key-${index}`,
              result.value.toString(),
              300,
            );
          }
        })
        .filter(Boolean);
      await Promise.all(redisPromises);

      const end = performance.now();
      results.map.push(end - start);
    }

    // 결과 계산
    const forEachAvg = results.forEach.reduce((a, b) => a + b, 0) / iterations;
    const mapAvg = results.map.reduce((a, b) => a + b, 0) / iterations;

    console.log('\n=== Performance Test Results ===');
    console.log(`Dataset size: ${dataSize}`);
    console.log(`Iterations: ${iterations}`);
    console.log(`forEach average: ${forEachAvg.toFixed(2)}ms`);
    console.log(`map average: ${mapAvg.toFixed(2)}ms`);
    console.log(`Difference: ${Math.abs(forEachAvg - mapAvg).toFixed(2)}ms`);
    console.log(
      `map is ${(forEachAvg / mapAvg).toFixed(2)}x faster than forEach`,
    );
    console.log('==============================\n');

    // 결과 검증
    expect(forEachAvg).toBeGreaterThan(0);
    expect(mapAvg).toBeGreaterThan(0);
  });
});

// 너무 데이터 크기가 작아서 차이가 없음
