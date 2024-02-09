import {
  Controller,
  Req,
  Request,
  UnauthorizedException,
  Post,
  Body,
  Logger,
} from '@nestjs/common';
import { GetOrderResponseDTO } from './dtos/getOrderService.dto';
import { SendConfirmationEmailDTO } from './dtos/sendConfirmationEmail.dto';
import { VerifyOrderDTO } from './dtos/verifyOrder.dto';
import { SendConfirmationEmailService } from './service/sendConfirmationEmail.service';
import { VerifyOrderStatusService } from './service/verifyOrderStatus.service';

@Controller('/orders')
export class OrdersController {
  constructor(
    private readonly sendConfirmationEmailService: SendConfirmationEmailService,
    private readonly verifyOrderStatusService: VerifyOrderStatusService,
  ) {}

  @Post('/send-email')
  async sendEmailConfirmation(
    @Req() request: Request,
    @Body() data: SendConfirmationEmailDTO,
  ): Promise<GetOrderResponseDTO> {
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader !== process.env.KEY || !authorizationHeader) {
      Logger.error('Chave inválida enviada');
      throw new UnauthorizedException('Chave inválida!');
    }
    const response = await this.sendConfirmationEmailService.execute(data);
    return response;
  }

  @Post('/verify-status')
  async verifyOrderStatus(
    @Req() request: Request,
    @Body() data: VerifyOrderDTO,
  ): Promise<string> {
    const authorizationHeader = request.headers['authorization'];
    const key = authorizationHeader.split(' ')[1];
    if (key !== process.env.KEY) {
      Logger.error('Chave inválida enviada');
      throw new UnauthorizedException('Chave inválida!');
    }
    Logger.log('Rota de verify sendo chamada, body:', {
      Body: {
        pedido: data.numero,
        pagamento: data.pagamentos[0].forma_pagamento.codigo,
        situação: data.situacao.aprovado,
      },
    });
    return await this.verifyOrderStatusService.execute(data);
  }
}
