import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TokenModule } from 'src/common/token/token.module';
import { ProviderController } from './provider.controller';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        forwardRef(() => TokenModule)
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
