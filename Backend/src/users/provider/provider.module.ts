import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProviderController } from './provider.controller';

@Module({
    imports: [
    ],
    controllers: [
        ProviderController
    ],
    providers: [
        PrismaService
    ],
    exports: [

     ]
})
export class ProviderModule {}
