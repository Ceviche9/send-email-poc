import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  Cliente,
  Item,
  Pagamento,
  Situacao,
} from '../../../common/store/dto/order.dto';

export class VerifyOrderDTO {
  @IsNotEmpty()
  cliente: Cliente;
  @IsNotEmpty()
  itens: Item[];
  @IsNumber()
  numero: number;
  @IsNotEmpty()
  pagamentos: Pagamento[];
  @IsNotEmpty()
  situacao: Situacao;
}
