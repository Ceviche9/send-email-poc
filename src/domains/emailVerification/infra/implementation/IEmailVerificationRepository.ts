import { EmailVerification } from '@prisma/client';
import { SaveEmailRequestDTO } from 'src/domains/orders/dtos/saveEmail.dto';

export interface IEmailVerificationRepository {
  findByOrderId(orderId: string): Promise<EmailVerification>;
  findByEmail(email: string): Promise<EmailVerification>;
  findAll(): Promise<EmailVerification[]>;
  create(data: SaveEmailRequestDTO): Promise<EmailVerification>;
}
