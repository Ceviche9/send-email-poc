import { Injectable } from '@nestjs/common';
import { EmailVerification, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/config/database/prisma.service';
import { saveEmailRequestDTO } from 'src/domains/orders/dtos/saveEmail.dto';

@Injectable()
export class EmailVerificationRepository {
  private EmailVerificationEntity: Prisma.EmailVerificationDelegate<DefaultArgs>;
  constructor(private prisma: PrismaService) {
    this.EmailVerificationEntity = this.prisma.emailVerification;
  }

  async findByEmail(email: string): Promise<EmailVerification> {
    const responseArray = await this.EmailVerificationEntity.findMany({
      where: {
        email,
      },
    });

    return responseArray[0];
  }

  async findAll(): Promise<EmailVerification[]> {
    return await this.EmailVerificationEntity.findMany();
  }

  async create({
    email,
    failed,
    method,
    orderId,
  }: saveEmailRequestDTO): Promise<EmailVerification> {
    return await this.EmailVerificationEntity.create({
      data: {
        email,
        failed,
        method,
        orderId,
      },
    });
  }
}
