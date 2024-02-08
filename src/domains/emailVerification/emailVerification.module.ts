import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/database/prisma.module';
import { EmailVerificationRepository } from './repository/emailVerification.repository';
import { EmailVerificationService } from './service/emailVerification.service';
import { EmailVerificationController } from './emailVerification.controller';

@Module({
  imports: [PrismaModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationRepository, EmailVerificationService],
  exports: [EmailVerificationRepository],
})
export class EmailVerificationModule {}
