import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port =
    process.env.PROD_ENVIRONMENT === 'false' ? 3000 : process.env.PORT;
  await app.listen(port);
}
bootstrap();
