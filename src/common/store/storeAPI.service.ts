import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OrderDTO } from './dto/order.dto';

@Injectable()
export class StoreAPIProvider {
  private apiURL: string = process.env.STORE_API_URL;

  async findOrder(id: string): Promise<OrderDTO> {
    try {
      const httpResponse = await axios.get(`${this.apiURL}/pedido/${id}`, {
        headers: {
          Authorization: process.env.AUTH,
        },
      });
      return httpResponse.data;
    } catch (err) {
      console.log('Err', err);
    }
  }
}
