import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { NodemailerProvider } from '../../../common/nodemailer/nodemailer.service';
import { VerifyOrderDTO } from '../dtos/verifyOrder.dto';
import { methodType } from '@prisma/client';
import { EmailVerificationService } from 'src/domains/emailVerification/service/emailVerification.service';

@Injectable()
export class VerifyOrderStatusService {
  constructor(
    private nodemailerProvider: NodemailerProvider,
    private emailVerificationService: EmailVerificationService,
  ) {}

  async execute(order: VerifyOrderDTO): Promise<string> {
    Logger.log('- [VerifyOrderStatusService] -');
    if (!order.pagamentos[0].forma_pagamento.codigo.includes('mercadopago')) {
      Logger.log('Pedido não foi pago pelo cartão');
      throw new BadRequestException('Esse pedido não não foi pago no cartão.');
    }

    if (!order.situacao.aprovado) {
      Logger.log('Pedido não foi aprovado');
      throw new BadRequestException('Esse pedido ainda não foi aprovado!');
    }

    Logger.log('[VerifyOrderStatusService] - Buscando email no banco');
    const emailAlreadyVerified =
      await this.emailVerificationService.findByEmail(order.cliente.email);

    if (emailAlreadyVerified) {
      Logger.log('Um email já foi enviado para esse usuário.', {
        body: {
          emailAlreadyVerified,
        },
      });
      throw new BadRequestException(
        'Esse usuário já recebeu um email de validação!',
      );
    }

    Logger.log('[VerifyOrderStatusService] - Chamando nodemailer provider');
    const response = await this.nodemailerProvider.sendMail({
      order: Number(order.numero),
      price: String(order.pagamentos[0].valor),
      products: order.itens.map((item) => item.nome),
      email: order.cliente.email,
      installments: order.pagamentos[0].numero_parcelas,
      installmentsValue: order.pagamentos[0].valor,
      name: order.cliente.nome,
    });

    Logger.log('[VerifyOrderStatusService] : Salvando envio de email no banco');
    await this.emailVerificationService.saveEmail({
      email: response.envelope.to[0],
      failed: response.accepted.length > 0 ? false : true,
      method: methodType.webhook,
      orderId: String(order.numero),
    });

    Logger.log('Email enviado:', {
      body: {
        queued: response.accepted,
      },
    });

    return 'ok';
  }
}
