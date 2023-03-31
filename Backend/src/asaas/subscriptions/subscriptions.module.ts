import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaymentsController } from '../payments/payments.controller';
import { SubscriptionsController } from './subscriptions.controller';

@Module({
    imports: [
        HttpModule,
        ConfigModule
    ],
    controllers: [SubscriptionsController],
    providers: [
      PrismaService
    ],
    exports: []
  })
export class SubscriptionsModule {}
