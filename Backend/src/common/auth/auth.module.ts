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
import { EmailService } from './email.service';
import { AuthController } from './auth.controller';
import { TwoFactorAuthService } from './two-factor.auth.service';
import { PasswordResetController } from './password-reset.controller';

@Module({
  imports: [
    PassportModule,
    TokenModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
<<<<<<< HEAD
  controllers: [AuthController, PasswordResetController],
=======
  controllers: [
    AuthController,
    PasswordResetController
  ],
>>>>>>> 38d88457d8705c0056b0b3ab788c3f5396ca3748
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    TokenController,
    EmailService,
    TwoFactorAuthService,
  ],
  exports: [AuthService, JwtModule, TokenModule],
})
export class AuthModule {}
