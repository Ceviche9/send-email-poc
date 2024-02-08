import { IsNotEmpty, IsNumber } from 'class-validator';
import { Cliente, Item, Situacao } from '../../../common/store/dto/order.dto';

export class VerifyOrderDTO {
  @IsNotEmpty()
  cliente: Cliente;
  @IsNotEmpty()
  itens: Item[];
  @IsNumber()
  numero: number;
  @IsNotEmpty()
  pagamentos: {
    id: number;
    numero_parcelas: number;
    valor: number;
    codigo: string;
  }[];
  @IsNotEmpty()
  situacao: Situacao;
}
