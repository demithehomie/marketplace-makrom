import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import { ClientModule } from './users/client/client.module';
import { ProviderModule } from './users/provider/provider.module';
import { CustomersModule } from './asaas/customers/customers.module';
import { PaymentLinksModule } from './asaas/payment-links/payment-links.module';
import { PaymentsModule } from './asaas/payments/payments.module';
import { SubscriptionsModule } from './asaas/subscriptions/subscriptions.module';
import { PrismaService } from './common/prisma/prisma.service';
import { IonicCorsMiddleware } from 'middlewares/ionic-cors.middleware';

@Module({
  imports: [
    AuthModule, 
    ClientModule, 
    ProviderModule, 
    CustomersModule,
    PaymentLinksModule, 
    PaymentsModule, 
    SubscriptionsModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    PrismaService,
    IonicCorsMiddleware
  ],
  exports: [
    PrismaService
  ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IonicCorsMiddleware).forRoutes('*');
  }
}
