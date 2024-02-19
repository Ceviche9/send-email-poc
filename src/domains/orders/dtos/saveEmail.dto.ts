import { methodType } from '@prisma/client';

export class SaveEmailRequestDTO {
  email: string;
  method: methodType;
  failed: boolean;
  orderId: string;
}
