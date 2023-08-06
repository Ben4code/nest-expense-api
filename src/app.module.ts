import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.moduel';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './auth/guards';
import { ExpenseModule } from './expense/expense.module';
import { RedisClientOptions } from 'redis'
import * as redisStore from 'cache-manager-redis-store'
import { SchedulerModule } from './scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    ExpenseModule,
    ScheduleModule.forRoot(),
    SchedulerModule,
    CacheModule.registerAsync<RedisClientOptions>({ 
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          store: redisStore,
          url: config.getOrThrow('REDIS_URL'),
          // url: 'redis://localhost:6379',
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
  ],
})
export class AppModule {}
