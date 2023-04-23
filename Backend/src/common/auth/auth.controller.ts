import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TwoFactorAuthGuard } from '../2fa/two-factor-auth.guard';
import { TwoFactorAuthService } from '../2fa/two-factor.auth.service';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly emailService: EmailService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/me')
  async me(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(TwoFactorAuthGuard)
  @Post('auth/2fa')
  async twoFactorAuth(@Request() req) {
    const { user } = req;
    const token = await this.authService.login(user);
    return token ;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/2fa/enable')
  async enableTwoFactorAuth(@Request() req) {
    const { user } = req;
    const secret = await this.twoFactorAuthService.generateToken();
    await this.prismaService.getClient().user.update({
      where: { id: user.id },
      data: { twoFactorSecret: secret, twoFactorEnabled: true },
    });
    await this.emailService.sendResetPasswordToken(user?.email, secret);
    return { message: 'Código de verificação enviado por email' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/2fa/disable')
  async disableTwoFactorAuth(@Request() req) {
    const { user } = req;
    await this.prismaService.getClient().user.update({
      where: { id: user.id },
      data: { twoFactorSecret: '0', twoFactorEnabled: false },
    });
    return { message: 'Verificação em dois fatores desativada' };
  }
}
