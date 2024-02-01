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

interface Cliente {
  cnpj: string | null;
  cpf: string;
  data_nascimento: string | null;
  email: string;
  id: number;
  nome: string;
  razao_social: string | null;
  resource_uri: string;
  sexo: string;
  telefone_celular: string;
  telefone_principal: string | null;
}

interface EnderecoEntrega {
  bairro: string;
  cep: string;
  cidade: string;
  cnpj: string | null;
  complemento: string | null;
  cpf: string;
  endereco: string;
  estado: string;
  id: number;
  ie: string;
  nome: string;
  numero: string;
  pais: string;
  razao_social: string | null;
  referencia: string | null;
  rg: string | null;
  tipo: string;
}

interface FormaEnvio {
  code: string;
  id: number;
  nome: string;
  tipo: string;
}

interface Envio {
  data_criacao: string;
  data_modificacao: string;
  forma_envio: FormaEnvio;
  id: number;
  objeto: string | null;
  prazo: number;
  valor: string;
}

interface Produto {
  id_externo: number;
  resource_uri: string;
}

interface Item {
  altura: number;
  disponibilidade: number;
  id: number;
  largura: number;
  linha: number;
  nome: string;
  pedido: string;
  peso: string;
  preco_cheio: string;
  preco_custo: string | null;
  preco_promocional: string;
  preco_subtotal: string;
  preco_venda: string;
  produto: Produto;
  produto_pai: string;
  profundidade: number;
  quantidade: string;
  sku: string;
  tipo: string;
}

interface FormaPagamento {
  codigo: string;
  configuracoes: {
    ativo: boolean;
    disponivel: boolean;
  };
  id: number;
  imagem: string;
  nome: string;
  resource_uri: string;
}

interface Parcelamento {
  numero_parcelas: number;
  valor_parcela: number;
}

interface Pagamento {
  authorization_code: string | null;
  banco: string | null;
  bandeira: string;
  codigo_retorno_gateway: string | null;
  forma_pagamento: FormaPagamento;
  id: number;
  identificador_id: string | null;
  mensagem_gateway: string | null;
  pagamento_tipo: string;
  parcelamento: Parcelamento;
  transacao_id: string | null;
  valor: string;
  valor_pago: string;
}

interface Situacao {
  aprovado: boolean;
  cancelado: boolean;
  codigo: string;
  final: boolean;
  id: number;
  nome: string;
  notificar_comprador: boolean;
  padrao: boolean;
  resource_uri: string;
}
