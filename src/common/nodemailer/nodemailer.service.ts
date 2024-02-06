import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SendMailRequestDTO } from './dto/sendMail.dto';
import { generateDocumentValidation } from './template/documentValidation';
@Injectable()
export class NodemailerProvider {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'email-ssl.com.br',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail({
    order,
    price,
    products,
    email,
    installments,
    installmentsValue,
    name,
  }: SendMailRequestDTO): Promise<SMTPTransport.SentMessageInfo> {
    try {
      const html = generateDocumentValidation({
        order,
        price,
        products,
        installments,
        installmentsValue,
        name,
      });
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email ? email : process.env.MY_EMAIL,
        subject: `Verificação de Documentação PED: ${order}`,
        html,
      });

      if (info.accepted.length === 0)
        throw new InternalServerErrorException(
          'Algo deu errado para enviar o email para essa conta',
        );
      return info;
    } catch (err) {
      throw new InternalServerErrorException('Erro ao enviar email');
    }
  }
}
