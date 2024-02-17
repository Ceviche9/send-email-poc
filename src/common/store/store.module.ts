import { Module } from '@nestjs/common';
import { StoreAPIProvider } from './storeAPI.service';

@Module({
  imports: [],
  controllers: [],
  providers: [StoreAPIProvider],
  exports: [StoreAPIProvider],
})
export class StoreAPIModule {}
