import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import {authMiddleware} from './middlewares/auth.middleware';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.setGlobalPrefix('api');
  app.use(authMiddleware);
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
