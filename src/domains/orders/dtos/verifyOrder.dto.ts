import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {
  Cliente,
  EnderecoEntrega,
  Envio,
  Item,
  Pagamento,
  Situacao,
} from '../../../common/store/dto/order.dto';

export class VerifyOrderDTO {
  @IsNotEmpty()
  cliente: Cliente;
  @IsOptional()
  cliente_obs: string | null;
  @IsOptional()
  cupom_desconto: string | null;
  @IsNotEmpty()
  endereco_entrega: EnderecoEntrega;
  @IsNotEmpty()
  envios: Envio[];
  @IsOptional()
  id_anymarket: string | null;
  @IsOptional()
  id_externo: string | null;
  @IsNotEmpty()
  itens: Item[];
  @IsNumber()
  numero: number;
  @IsNotEmpty()
  pagamentos: Pagamento[];
  @IsNotEmpty()
  situacao: Situacao;
}
