import { IsNotEmpty, IsOptional } from 'class-validator';

export class SendConfirmationEmailDTO {
  @IsNotEmpty()
  orderId: string;
  @IsOptional()
  email?: string;
}
