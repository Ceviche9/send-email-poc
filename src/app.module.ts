import { Module } from '@nestjs/common';
import { OrdersModules } from './domains/orders/orders.module';
import { StoreAPIModule } from './common/store/store.module';
import { NodemailerModule } from './common/nodemailer/nodemailer.module';
import { EmailVerificationModule } from './domains/emailVerification/emailVerification.module';

@Module({
  imports: [
    OrdersModules,
    StoreAPIModule,
    NodemailerModule,
    EmailVerificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
