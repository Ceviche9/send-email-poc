import { Module } from '@nestjs/common';
import { StoreAPIProvider } from './storeAPI.service';

@Module({
  imports: [],
  controllers: [],
  providers: [StoreAPIProvider],
})
export class StoreAPIModule {}
