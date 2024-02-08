import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NodemailerModule } from 'src/common/nodemailer/nodemailer.module';
import { EmailVerificationModule } from '../emailVerification/emailVerification.module';
import { SendConfirmationEmailService } from './service/sendConfirmationEmail.service';
import { VerifyOrderStatusService } from './service/verifyOrderStatus.service';
import { StoreAPIModule } from 'src/common/store/store.module';
import { EmailVerificationService } from '../emailVerification/service/emailVerification.service';

@Module({
  imports: [NodemailerModule, EmailVerificationModule, StoreAPIModule],
  controllers: [OrdersController],
  providers: [
    SendConfirmationEmailService,
    VerifyOrderStatusService,
    EmailVerificationService,
  ],
})
export class OrdersModules {}
