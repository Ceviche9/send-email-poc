import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { GetOrderResponseDTO } from '../dtos/getOrderService.dto';
import { SendConfirmationEmailDTO } from '../dtos/sendConfirmationEmail.dto';
import { NodemailerProvider } from 'src/common/nodemailer/nodemailer.service';
import { StoreAPIProvider } from 'src/common/store/storeAPI.service';
import { EmailVerificationService } from 'src/domains/emailVerification/service/emailVerification.service';
import { methodType } from '@prisma/client';

@Injectable()
export class SendConfirmationEmailService {
  constructor(
    private storeAPI: StoreAPIProvider,
    private nodemailerProvider: NodemailerProvider,
    private emailVerificationService: EmailVerificationService,
  ) {}

  async execute({
    orderId,
    email,
  }: SendConfirmationEmailDTO): Promise<GetOrderResponseDTO> {
    Logger.log('- [SendConfirmationEmailService] -');
    const order = await this.storeAPI.findOrder(orderId);

    if (!order) {
      Logger.log('Id de pedido errado', {
        body: {
          pedido: orderId,
        },
      });
      throw new BadRequestException('iD de pedido está errado!');
    }

    if (!order.situacao.aprovado) {
      Logger.log('Esse pedido ainda não foi aprovado!', {
        body: {
          status: order.situacao,
        },
      });
      throw new BadRequestException('Esse pedido ainda não foi aprovado!');
    }

    if (!order.pagamentos[0].forma_pagamento.codigo.includes('mercadopago')) {
      Logger.log('Esse pedido não foi pago no cartão', {
        body: {
          codigo: order.pagamentos[0].forma_pagamento.codigo,
        },
      });
      throw new BadRequestException('Esse pedido não foi pago no cartão.');
    }

    Logger.log('- [SendConfirmationEmailService] - Enviando email');
    const emailResponse = await this.nodemailerProvider.sendMail({
      order: Number(orderId),
      price: order.pagamentos[0].valor_pago,
      products: order.itens.map((item) => item.nome),
      email,
      installments: order.pagamentos[0].parcelamento.numero_parcelas,
      installmentsValue: order.pagamentos[0].parcelamento.valor_parcela,
      name: order.cliente.nome,
    });

    Logger.log('- [SendConfirmationEmailService] - Salvando no banco');
    await this.emailVerificationService.saveEmail({
      email: emailResponse.envelope.to[0],
      failed: emailResponse.accepted.length > 0 ? false : true,
      method: methodType.manually,
      orderId: String(order.numero),
    });

    return {
      email: emailResponse,
      orderId: orderId,
    };
  }
}
