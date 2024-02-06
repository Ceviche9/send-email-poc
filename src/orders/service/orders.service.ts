import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { StoreAPIProvider } from 'src/common/store/storeAPI.service';
import { NodemailerProvider } from '../../common/nodemailer/nodemailer.service';
import { GetOrderResponseDTO } from '../dtos/getOrderService.dto';
import { SendConfirmationEmailDTO } from '../dtos/sendConfirmationEmail.dto';
import { OrderDTO } from 'src/common/store/dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private storeAPI: StoreAPIProvider,
    private nodemailerProvider: NodemailerProvider,
  ) {}
  async sendConfirmationEmail({
    orderId,
    email,
  }: SendConfirmationEmailDTO): Promise<GetOrderResponseDTO> {
    const order = await this.storeAPI.findOrder(orderId);

    if (!order) {
      Logger.error('Id de pedido errado', orderId);
      throw new BadRequestException('iD de pedido está errado!');
    }

    if (!order.situacao.aprovado) {
      throw new BadRequestException('Esse pedido ainda não foi aprovado!');
    }

    if (order.pagamentos[0].forma_pagamento.codigo !== 'mercadopagov1') {
      throw new BadRequestException('Esse pedido não não foi pago no cartão.');
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

    return {
      email: emailResponse,
      orderId: orderId,
    };
  }

  async verifyOrderStatus(order: OrderDTO): Promise<void> {
    if (order.pagamentos[0].forma_pagamento.codigo !== 'mercadopagov1') {
      Logger.error(
        'Pedido não foi pago pelo cartão:',
        order.pagamentos[0].forma_pagamento.codigo,
      );
      throw new BadRequestException('Esse pedido não não foi pago no cartão.');
    }

    if (!order.situacao.aprovado) {
      Logger.error('Pedido não foi aprovado:', order.situacao);
      throw new BadRequestException('Esse pedido ainda não foi aprovado!');
    }

    await this.nodemailerProvider.sendMail({
      order: Number(order.numero),
      price: order.pagamentos[0].valor_pago,
      products: order.itens.map((item) => item.nome),
      email: process.env.ALAN_EMAIL,
      installments: order.pagamentos[0].parcelamento.numero_parcelas,
      installmentsValue: order.pagamentos[0].parcelamento.valor_parcela,
      name: order.cliente.nome,
    });
  }
}
