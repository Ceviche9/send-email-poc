import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './service/orders.service';
import { StoreAPIProvider } from 'src/common/store/storeAPI.service';
import { NodemailerModule } from 'src/common/nodemailer/nodemailer.module';

@Module({
  imports: [NodemailerModule],
  controllers: [OrdersController],
  providers: [OrdersService, StoreAPIProvider],
})
export class OrdersModules {}
