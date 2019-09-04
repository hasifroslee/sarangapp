import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { appConfig } from '../configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(appConfig.port);
}
bootstrap();
