import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TokenModule } from 'src/common/token/token.module';
import { EmailService } from 'src/common/email/email.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => TokenModule)
  ],
  controllers: [
    UserController
  ],
  providers: [
    PrismaService,
    EmailService
  ],
  exports: [ ]
})

export class UserModule {}