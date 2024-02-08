import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { StoreAPIProvider } from 'src/common/store/storeAPI.service';
import { NodemailerProvider } from '../../../common/nodemailer/nodemailer.service';
import { GetOrderResponseDTO } from '../dtos/getOrderService.dto';
import { SendConfirmationEmailDTO } from '../dtos/sendConfirmationEmail.dto';
import { VerifyOrderDTO } from '../dtos/verifyOrder.dto';
import { EmailVerificationRepository } from '../../emailVerification/repository/emailVerification.repository';
import { methodType } from '@prisma/client';
import { saveEmailRequestDTO } from '../dtos/saveEmail.dto';

@Injectable()
export class OrdersService {
  constructor(
    private storeAPI: StoreAPIProvider,
    private nodemailerProvider: NodemailerProvider,
    private emailVerificationRepository: EmailVerificationRepository,
  ) {}
  async sendConfirmationEmail({
    orderId,
    email,
  }: SendConfirmationEmailDTO): Promise<GetOrderResponseDTO> {
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

    if (order.pagamentos[0].forma_pagamento.codigo !== 'mercadopagov1') {
      Logger.log('Esse pedido não foi pago no cartão', {
        body: {
          codigo: order.pagamentos[0].forma_pagamento.codigo,
        },
      });
      throw new BadRequestException('Esse pedido não foi pago no cartão.');
    }

    const emailResponse = await this.nodemailerProvider.sendMail({
      order: Number(orderId),
      price: order.pagamentos[0].valor_pago,
      products: order.itens.map((item) => item.nome),
      email,
      installments: order.pagamentos[0].parcelamento.numero_parcelas,
      installmentsValue: order.pagamentos[0].parcelamento.valor_parcela,
      name: order.cliente.nome,
    });

    await this.saveEmail({
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

  async verifyOrderStatus(order: VerifyOrderDTO): Promise<string> {
    Logger.log('[OrdersService] - verifyOrderStatus');
    if (order.pagamentos[0].codigo !== 'mercadopagov1') {
      Logger.log('Pedido não foi pago pelo cartão');
      throw new BadRequestException('Esse pedido não não foi pago no cartão.');
    }

    if (!order.situacao.aprovado) {
      Logger.log('Pedido não foi aprovado');
      throw new BadRequestException('Esse pedido ainda não foi aprovado!');
    }

    Logger.log('[OrdersService] - verifyOrderStatus: Chamando nodemailer', {
      body: {
        pagamento: order.pagamentos[0],
      },
    });
    const response = await this.nodemailerProvider.sendMail({
      order: Number(order.numero),
      price: String(order.pagamentos[0].valor),
      products: order.itens.map((item) => item.nome),
      email: process.env.MY_EMAIL,
      installments: order.pagamentos[0].numero_parcelas,
      installmentsValue: order.pagamentos[0].valor,
      name: order.cliente.nome,
    });

    Logger.log(
      '[OrdersService] - verifyOrderStatus: Salvando envio de email no banco',
    );
    await this.saveEmail({
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

  private async saveEmail({
    email,
    failed,
    method,
    orderId,
  }: saveEmailRequestDTO): Promise<void> {
    if (!failed) {
      await this.emailVerificationRepository.create({
        email,
        method,
        orderId,
        failed,
      });
    } else {
      await this.emailVerificationRepository.create({
        email: email,
        failed,
        method,
        orderId,
      });
    }
  }
}
