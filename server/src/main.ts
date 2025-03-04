import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser';
import * as process from 'node:process'
import { ConfigService } from '@nestjs/config';
import IORedis from 'ioredis';
import * as session from 'express-session'

import { AppModule } from './app.module';
import { ms, StringValue } from './libs/common/utils/ms.util'
import { parseBoolean } from './libs/common/utils/parse-boolean.util'
import { RedisStore } from 'connect-redis'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService) // Чтобы писать config.getOrThrow('name')

  app.use(cookieParser());

  //app.useGlobalPipes(new ValidationPipe({transform: true}))

  app.enableCors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  const configSwagger = new DocumentBuilder()
      .setTitle('Deep-ex-sense API')
      .setDescription('The Deep-ex-sense API description')
      .setVersion('1.0')
      .addTag('Deep-ex-sense')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory);

  const redis = new IORedis(config.getOrThrow('REDIS_URI'))
  app.use(
      session({
        secret: config.getOrThrow<string>('SESSION_SECRET'),
        name: config.getOrThrow<string>('SESSION_NAME'),
        resave: true,
        saveUninitialized: false,
        cookie: {
          domain: config.getOrThrow<string>('SESSION_DOMAIN'),
          maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
          httpOnly: parseBoolean(
              config.getOrThrow<string>('SESSION_HTTP_ONLY')
          ),
          secure: parseBoolean(
              config.getOrThrow<string>('SESSION_SECURE')
          ),
          sameSite: 'lax'
        },
        store: new RedisStore({
          client: redis,
          prefix: config.getOrThrow<string>('SESSION_FOLDER')
        })
      })
  )

  await app.listen(process.env.SERVER_PORT ?? 5000);
}
bootstrap();
