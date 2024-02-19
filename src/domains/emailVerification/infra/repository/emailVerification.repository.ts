import { Injectable } from '@nestjs/common';
import { EmailVerification, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/config/database/prisma.service';
import { SaveEmailRequestDTO } from 'src/domains/orders/dtos/saveEmail.dto';
import { IEmailVerificationRepository } from '../implementation/IEmailVerificationRepository';

@Injectable()
export class EmailVerificationRepository
  implements IEmailVerificationRepository
{
  private EmailVerificationEntity: Prisma.EmailVerificationDelegate<DefaultArgs>;
  constructor(private prisma: PrismaService) {
    this.EmailVerificationEntity = this.prisma.emailVerification;
  }

  async findByOrderId(orderId: string): Promise<EmailVerification> {
    return await this.EmailVerificationEntity.findUnique({
      where: {
        orderId,
      },
    });
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
  }: SaveEmailRequestDTO): Promise<EmailVerification> {
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
