import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/database/prisma.module';
import { EmailVerificationRepository } from './repository/emailVerification.repository';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [EmailVerificationRepository],
  exports: [EmailVerificationRepository],
})
export class EmailVerificationModule {}
