import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TokenModule } from 'src/common/token/token.module';
import { ClientController } from './client.controller';
import { EmailService } from 'src/common/auth/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => TokenModule)
  ],
  controllers: [ClientController],
  providers: [
    PrismaService,
    EmailService
  ],
  exports: [ ]
})
export class ClientModule {}
