import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { PrismaService } from '../prisma/prisma.service';
import { TokenController } from '../token/token.controller';
import { TokenModule } from '../token/token.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { EmailService } from '../2fa/email/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    TokenModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s'}
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    TokenController,
    EmailService
  ],
  exports: [
    AuthService,
    JwtModule,
    TokenModule
  ],
})
export class AuthModule {}
