import {
  Cliente,
  EnderecoEntrega,
  Envio,
  Item,
  Pagamento,
  Situacao,
} from './order.dto';

export class OrderDTO {
  cliente: Cliente;
  cliente_obs: string | null;
  cupom_desconto: string | null;
  data_criacao: string;
  data_expiracao: string;
  data_modificacao: string;
  endereco_entrega: EnderecoEntrega;
  envios: Envio[];
  id_anymarket: string | null;
  id_externo: string | null;
  itens: Item[];
  numero: number;
  pagamentos: Pagamento[];
  peso_real: string;
  resource_uri: string;
  situacao: Situacao;
  utm_campaign: string | null;
  valor_desconto: string;
  valor_envio: string;
  valor_subtotal: string;
  valor_total: string;
}
