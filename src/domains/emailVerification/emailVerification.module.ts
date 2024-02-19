import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/database/prisma.module';
import { EmailVerificationService } from './service/emailVerification.service';
import { EmailVerificationController } from './emailVerification.controller';
import { EmailVerificationRepository } from './infra/repository/emailVerification.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationRepository, EmailVerificationService],
  exports: [EmailVerificationRepository],
})
export class EmailVerificationModule {}
