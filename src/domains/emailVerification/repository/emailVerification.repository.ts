import { Injectable } from '@nestjs/common';
import { EmailVerification, Prisma, methodType } from '@prisma/client';
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
    method,
  }: {
    email: string;
    failed?: boolean;
    method: methodType;
  }): Promise<EmailVerification> {
    return await this.EmailVerificationEntity.create({
      data: {
        email,
        failed,
        method,
      },
    });
  }
}
