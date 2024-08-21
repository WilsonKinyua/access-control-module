import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpRequestExceptionFilter } from './common/filters/http-request-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // global validation pipe
  app.useGlobalFilters(new HttpRequestExceptionFilter()); // global exception filter
  await app.listen(3000); 
}
bootstrap();
