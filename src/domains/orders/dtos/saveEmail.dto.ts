import { methodType } from '@prisma/client';

export class saveEmailRequestDTO {
  email: string;
  method: methodType;
  failed: boolean;
}
