import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaymentsController } from './payments.controller';

@Module({
    imports: [
        HttpModule,
        ConfigModule
    ],
    controllers: [PaymentsController],
    providers: [
      PrismaService
    ],
    exports: []
  })
export class PaymentsModule {}
