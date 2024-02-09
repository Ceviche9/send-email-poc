import { Injectable, Logger } from '@nestjs/common';
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
    try {
      await this.emailVerificationRepository.create({
        email: email,
        failed,
        method,
        orderId,
      });
    } catch (err) {
      console.log(err);
      Logger.error('Não foi possível salvar essa informação no banco.', {
        body: {
          email,
          failed,
          method,
          orderId,
        },
      });
    }
  }

  async findByEmail(email: string): Promise<EmailVerification> {
    return await this.emailVerificationRepository.findByEmail(email);
  }
}
