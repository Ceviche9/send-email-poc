import { Injectable } from '@nestjs/common';
import { EmailVerificationRepository } from '../repository/emailVerification.repository';
import { EmailVerification } from '@prisma/client';
import { saveEmailRequestDTO } from 'src/domains/orders/dtos/saveEmail.dto';

@Injectable()
export class EmailVerificationService {
  constructor(
    private emailVerificationRepository: EmailVerificationRepository,
  ) {}

  async getAllEmails(): Promise<EmailVerification[]> {
    return await this.emailVerificationRepository.findAll();
  }

  async saveEmail({
    email,
    failed,
    method,
    orderId,
  }: saveEmailRequestDTO): Promise<void> {
    await this.emailVerificationRepository.create({
      email: email,
      failed,
      method,
      orderId,
    });
  }
}
