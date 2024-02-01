import { BadRequestException, Injectable } from '@nestjs/common';
import { StoreAPIProvider } from 'src/common/store/storeAPI.service';
import { NodemailerProvider } from '../../common/nodemailer/nodemailer.service';
import { GetOrderResponseDTO } from '../dtos/getOrderService.dto';

@Injectable()
export class OrdersService {
  constructor(
    private storeAPI: StoreAPIProvider,
    private nodemailerProvider: NodemailerProvider,
  ) {}
  async getOrder(id: string, email?: string): Promise<GetOrderResponseDTO> {
    const order = await this.storeAPI.findOrder(id);

    if (!order.situacao.aprovado) {
      throw new BadRequestException('Esse pedido ainda não foi aprovado!');
    }

    if (order.pagamentos[0].forma_pagamento.codigo !== 'mercadopagov1') {
      throw new BadRequestException('Esse pedido não não foi pago no cartão.');
    }

    // Send email.
    const emailResponse = await this.nodemailerProvider.sendMail({
      order: Number(id),
      price: order.pagamentos[0].valor_pago,
      products: order.itens.map((item) => item.nome),
      email,
    });

    return {
      email: emailResponse,
      orderId: id,
    };
  }
}
