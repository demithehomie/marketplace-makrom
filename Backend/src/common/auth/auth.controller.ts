import { Body, Controller, Post, UseGuards, Request,Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TwoFactorAuthGuard } from './two-factor-auth.guard';
import { TwoFactorAuthService } from './two-factor.auth.service';
import { EmailService } from './email.service';
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
  @Post('auth/login')
  async login(@Request() req) {
    const { user } = req;
    const token = await this.authService.login(user);
    return { token };
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
    return { token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/2fa/enable')
  async enableTwoFactorAuth(@Request() req) {
    const { user } = req;
    const secret = await this.twoFactorAuthService.generateSecret();
    await this.prismaService.getClient().client.update({
      where: { id: user.id },
      data: { twoFactorSecret: secret, twoFactorEnabled: true },
    });
    await this.emailService.sendTwoFactorToken(user.email, secret);
    return { message: 'Código de verificação enviado por email' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/2fa/disable')
  async disableTwoFactorAuth(@Request() req) {
    const { user } = req;
    await this.prismaService.getClient().client.update({
      where: { id: user.id },
      data: { twoFactorSecret: null, twoFactorEnabled: false },
    });
    return { message: 'Verificação em dois fatores desativada' };
  }
}