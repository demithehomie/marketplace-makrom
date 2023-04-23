import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CustomersController } from './customers.controller';

@Module({
    imports: [
        HttpModule,
        ConfigModule
    ],
    controllers: [CustomersController],
    providers: [
      PrismaService
    ],
    exports: []
  })
export class CustomersModule {}
