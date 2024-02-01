import {
  Controller,
  Get,
  Param,
  Req,
  Request,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { OrdersService } from './service/orders.service';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/:id/:email')
  async getOrderById(
    @Req() request: Request,
    @Param('id') id: string,
    @Param('email') email: string,
  ): Promise<string> {
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader !== process.env.KEY)
      throw new UnauthorizedException('Chave inválida!');
    if (!id)
      throw new BadRequestException('Informe um número de pedido válido!');
    const response = await this.ordersService.getOrder(id, email);
    return response;
  }
}
