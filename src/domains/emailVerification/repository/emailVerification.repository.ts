import { Injectable } from '@nestjs/common';
import { EmailVerification, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class EmailVerificationRepository {
  private EmailVerificationEntity: Prisma.EmailVerificationDelegate<DefaultArgs>;
  constructor(private prisma: PrismaService) {
    this.EmailVerificationEntity = this.prisma.emailVerification;
  }

  async create({
    email,
    failed,
  }: {
    email: string;
    failed?: boolean;
  }): Promise<EmailVerification> {
    return await this.EmailVerificationEntity.create({
      data: {
        email,
        failed,
      },
    });
  }
}
