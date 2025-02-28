import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000'),

  // Database
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string().default('5432'),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_MAX_CONNECTIONS: z.string().default('100'),
  POSTGRES_IDLE_TIMEOUT: z.string().default('30000'),

  // Redis
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().default('6379'),

  // Client URLs
  CLIENT_URL_DEV: z.string(),
  CLIENT_URL_PROD: z.string(),

  // // AWS
  // AWS_ACCESS_KEY_ID: z.string(),
  // AWS_SECRET_ACCESS_KEY: z.string(),
  // AWS_REGION: z.string(),
  // AWS_S3_BUCKET_NAME: z.string(),
  // AWS_S3_BUCKET_REGION: z.string(),
  // AWS_S3_BUCKET_URL: z.string(),
});

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (config: Record<string, unknown>) => {
        try {
          return envSchema.parse(config);
        } catch (error) {
          console.error('Environment validation error:', error);
          throw error;
        }
      },
    }),
  ],
})
export class ConfigModule {}
