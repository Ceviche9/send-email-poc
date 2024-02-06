import { BadRequestException, Injectable } from '@nestjs/common';
import { StoreAPIProvider } from 'src/common/store/storeAPI.service';
import { NodemailerProvider } from '../../common/nodemailer/nodemailer.service';
import { GetOrderResponseDTO } from '../dtos/getOrderService.dto';
import { SendConfirmationEmailDTO } from '../dtos/sendConfirmationEmail.dto';

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
}
