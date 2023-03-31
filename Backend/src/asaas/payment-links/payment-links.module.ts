import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaymentLinksController } from './payment-links.controller';

@Module({
    imports: [
        HttpModule,
        ConfigModule
    ],
    controllers: [PaymentLinksController],
    providers: [
      PrismaService
    ],
    exports: []
  })
export class PaymentLinksModule {}
