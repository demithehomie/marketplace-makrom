import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { PrismaService } from '../prisma/prisma.service';
import { compareSync } from 'bcrypt';
import * as bcrypt from 'bcrypt';

@Controller()
export class PasswordResetController {
  constructor(
    private readonly emailService: EmailService,
    private readonly prismaService: PrismaService,
  ) {}y

  @Post('auth/password-reset/request')
  async requestPasswordReset(@Body() { email }) {
    const user = await this.prismaService.getClient().client.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const speakeasy = require('speakeasy');
    const token = speakeasy.totp({
      secret: speakeasy.generateSecret({ length: 20 }).base32,
      digits: 6
    });
    await this.prismaService.getClient().client.update({
      where: { email: user.email },
      data: { resetPasswordToken: token, resetPasswordTokenExpiresAt: new Date(Date.now() + 3600000) }, // expires in 1 hour
    });
    await this.emailService.sendResetPasswordToken(user.email, token);
    return { message: 'Email enviado com instruções para redefinir a senha' };
  }

  @Post('auth/password-reset/confirm')
  async confirmPasswordReset(@Body() { token, password }) {
    const user = await this.prismaService.getClient().client.findUnique({ where: { resetPasswordToken: token } });
    if (!user || user.resetPasswordTokenExpiresAt < new Date()) {
      throw new Error('Token inválido ou expirado');
    }
    const passwordHash = await bcrypt.hashSync(user.senha, 8);
    await this.prismaService.getClient().client.update({
      where: { email: user.email,  },
      data: { senha: passwordHash, resetPasswordToken: "0", resetPasswordTokenExpiresAt: new Date(Date.now()) },
    });
    return { message: 'Senha redefinida com sucesso' };
  }
}
