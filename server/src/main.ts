import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser';
import * as process from 'node:process'

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  const config = new DocumentBuilder()
      .setTitle('Deep-ex-sense API')
      .setDescription('The Deep-ex-sense API description')
      .setVersion('1.0')
      .addTag('Deep-ex-sense')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.SERVER_PORT ?? 5000);
}
bootstrap();
