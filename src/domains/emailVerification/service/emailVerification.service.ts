import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EmailVerification } from '@prisma/client';
import { EmailVerificationRepository } from '../infra/repository/emailVerification.repository';
import { SaveEmailRequestDTO } from 'src/domains/orders/dtos/saveEmail.dto';

@Injectable()
export class EmailVerificationService {
  constructor(
    private emailVerificationRepository: EmailVerificationRepository,
  ) {}

  async findByOrderId(orderId: string): Promise<EmailVerification> {
    const response =
      await this.emailVerificationRepository.findByOrderId(orderId);

    if (!response) {
      Logger.log('Não foi enviado nenhum email para esse pedido');
      throw new BadRequestException(
        'Não foi enviado nenhum email para esse pedido',
      );
    }

    return response;
  }

  async getAllEmails(): Promise<EmailVerification[]> {
    return await this.emailVerificationRepository.findAll();
  }

  async saveEmail({
    email,
    failed,
    method,
    orderId,
  }: SaveEmailRequestDTO): Promise<void> {
    try {
      await this.emailVerificationRepository.create({
        email: email,
        failed,
        method,
        orderId,
      });
    } catch (err) {
      Logger.error('Não foi possível salvar essa informação no banco.');
      throw new BadRequestException(
        'Um email para esse pedido já foi salvo na banco',
      );
    }
  }

  async findByEmail(email: string): Promise<EmailVerification> {
    return await this.emailVerificationRepository.findByEmail(email);
  }
}
