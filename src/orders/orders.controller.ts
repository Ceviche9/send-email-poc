import {
  Controller,
  Req,
  Request,
  UnauthorizedException,
  Post,
  Body,
} from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { GetOrderResponseDTO } from './dtos/getOrderService.dto';
import { SendConfirmationEmailDTO } from './dtos/sendConfirmationEmail.dto';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/send-email')
  async sendEmailConfirmation(
    @Req() request: Request,
    @Body() data: SendConfirmationEmailDTO,
  ): Promise<GetOrderResponseDTO> {
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader !== process.env.KEY)
      throw new UnauthorizedException('Chave inválida!');
    const response = await this.ordersService.sendConfirmationEmail(data);
    return response;
  }

  @Post('/verify-status')
  async verifyOrderStatus(
    @Req() request: Request,
    @Body() data: any,
  ): Promise<void> {
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader !== process.env.KEY)
      throw new UnauthorizedException('Chave inválida!');
    await this.ordersService.verifyOrderStatus(data);
  }
}
