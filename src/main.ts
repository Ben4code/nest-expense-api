import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import { ValidationPipe } from '@nestjs/common';
import { createClient } from 'redis'
import * as connectRedis from 'connect-redis'
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Config service outside Dependaency Injection
  const config = app.get(ConfigService)

  // Redis Connection
  const RedisStore = connectRedis(session)
  const redisClient = createClient({
    url: config.getOrThrow('REDIS_URL'),
    legacyMode: true
  })

  app.use(session({
    secret: config.getOrThrow('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      client: redisClient
    })
  }));

  // Redis coonect
  await redisClient.connect().catch((error) => {
    throw error
  })
  
  app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )
  
  await app.listen(3333);
}
bootstrap();
