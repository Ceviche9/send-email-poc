import {
  Controller,
  Req,
  Request,
  UnauthorizedException,
  Post,
  Body,
  Logger,
} from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { GetOrderResponseDTO } from './dtos/getOrderService.dto';
import { SendConfirmationEmailDTO } from './dtos/sendConfirmationEmail.dto';
import { VerifyOrderDTO } from './dtos/verifyOrder.dto';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

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
    const response = await this.ordersService.sendConfirmationEmail(data);
    return response;
  }

  @Post('/verify-status')
  async verifyOrderStatus(
    @Req() request: Request,
    @Body() data: VerifyOrderDTO,
  ): Promise<string> {
    console.log('data', data);
    Logger.log('Rota de verify sendo chamada, body:', {
      Body: {
        pedido: data.numero,
        pagamento: data.pagamentos[0].pagamento_tipo,
      },
    });
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader !== process.env.KEY)
      throw new UnauthorizedException('Chave inválida!');
    return await this.ordersService.verifyOrderStatus(data);
  }
}
