import { Module } from '@nestjs/common';
import { OrdersModules } from './orders/orders.module';
import { StoreAPIModule } from './common/store/store.module';
import { NodemailerModule } from './common/nodemailer/nodemailer.module';

@Module({
  imports: [OrdersModules, StoreAPIModule, NodemailerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
