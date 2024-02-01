import { Module } from '@nestjs/common';
import { NodemailerProvider } from './nodemailer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [NodemailerProvider],
  exports: [NodemailerProvider],
})
export class NodemailerModule {}
