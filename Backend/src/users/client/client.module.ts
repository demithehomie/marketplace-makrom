import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ClientController } from './client.controller';

@Module({
  imports: [
  ],
  controllers: [
    ClientController
  ],
  providers: [
    PrismaService
  ],
  exports: [ 
    
  ]
})
export class ClientModule {}
