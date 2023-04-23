import { Module } from '@nestjs/common';
import { ClientModule } from 'src/users/client/client.module';
import { ProviderModule } from 'src/users/provider/provider.module';
import { PrismaService } from '../prisma/prisma.service';
import { TokenController } from './token.controller';

@Module({
  imports: [ 
    ClientModule, 
    ProviderModule
  ],
  controllers: [
    TokenController
  ],
  providers: [
    PrismaService
  ],
  exports: [
    PrismaService
  ]
})
export class TokenModule {}
