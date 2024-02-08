import { Injectable } from '@nestjs/common';
import { EmailVerificationRepository } from '../repository/emailVerification.repository';
import { EmailVerification } from '@prisma/client';

@Injectable()
export class EmailVerificationService {
  constructor(
    private emailVerificationRepository: EmailVerificationRepository,
  ) {}

  async getAllEmails(): Promise<EmailVerification[]> {
    return await this.emailVerificationRepository.findAll();
  }
}
