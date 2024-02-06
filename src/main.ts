import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const port =
    process.env.PROD_ENVIRONMENT === 'false' ? 3000 : process.env.PORT;
  await app.listen(port);
}
bootstrap();
