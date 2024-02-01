import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './service/orders.service';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/:id')
  async getOrderById(@Param('id') id: string): Promise<string> {
    const response = await this.ordersService.getOrder(id);
    return response;
  }
}
