import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class GetOrderResponseDTO {
  email: SMTPTransport.SentMessageInfo;
  orderId: string;
}
