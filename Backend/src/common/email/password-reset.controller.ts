import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';

@Controller()
export class PasswordResetController {

  constructor(
    private readonly emailService: EmailService,
    private readonly prismaService: PrismaService
  ) {}

  @Post('auth/password-reset/email-request')
  async requestPasswordReset(@Body() { email }) {
    const user = await this.prismaService
      .getClient()
      .user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const speakeasy = require('speakeasy');
    const token = speakeasy.totp({
      secret: speakeasy.generateSecret({ length: 20 }).base32,
      digits: 6,
    });
    await this.prismaService.getClient().user.update({
      where: { email: user.email },
      data: {
        resetPasswordToken: token,
        resetPasswordTokenExpiresAt: new Date(Date.now() + 3600000),
      }, // expires in 1 hour
    });
    await this.emailService.sendResetPasswordToken(user.email, token);
    return { message: 'Email enviado com instruções para redefinir a senha' };
  }

  @Post('auth/password-reset/email-confirm')
  async confirmPasswordReset(@Body() { email, token, senha }) {
    const user = await this.prismaService
      .getClient()
      .user.findUnique({ where: { email: email } });
    if (!user || user.resetPasswordToken !== token || user.resetPasswordTokenExpiresAt < new Date()) {
      throw new Error('Token inválido ou expirado');
    }
    const passwordHash = await bcrypt.hash( senha, 8);
    await this.prismaService.getClient().user.update({
      where: { email: email },
      data: {
        senha: passwordHash,
        resetPasswordToken: '0',
        resetPasswordTokenExpiresAt: new Date(Date.now()),
      },
    });
    return { message: 'Senha redefinida com sucesso' };
  }
}
