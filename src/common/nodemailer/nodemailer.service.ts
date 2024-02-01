import { Injectable } from '@nestjs/common';
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
  }: SendMailRequestDTO): Promise<void> {
    try {
      const html = generateDocumentValidation({
        order,
        price,
        products,
      });
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email ? email : 'ayotunde_sales@hotmail.com',
        subject: `Verificação de Documentação PED: ${order}`,
        html,
      });

      console.log(info);
      if (info.accepted.length === 0)
        throw new Error('Algo deu errado para enviar o email para essa conta');
    } catch (err) {
      console.log(err);
    }
  }
}
