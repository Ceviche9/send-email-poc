export class SendMailRequestDTO {
  email: string;
  products: string[];
  order: number;
  price: string;
  installments: number;
  installmentsValue: number;
  name: string;
}
