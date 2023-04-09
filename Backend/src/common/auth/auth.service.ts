import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { TokenController } from '../token/token.controller';
import { EmailService } from '../2fa/email/email.service';
import * as speakeasy from 'speakeasy';
import { jwtConstants } from './constants';
import * as dotenv from 'dotenv';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private token: TokenController,
    private emailService: EmailService
  ) {
    dotenv.config();
  }

  async validateClient(email: string, senha: string): Promise<any> {
    const client = await this.prisma.getClient().client.findUnique({ where: { email } });
    if (!client) {
      throw new UnauthorizedException();
    }
    const isValidPassword = await bcrypt.compare(senha, client.senha);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    return client;
  }
  
  async validateProvider(email: string, senha: string): Promise<any> {
    const provider = await this.prisma.getClient().provider.findUnique({ where: { email } });
    if (!provider) {
      throw new UnauthorizedException();
    }
    const isValidPassword = await bcrypt.compare(senha, provider.senha);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    return provider;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload)
    this.token.saveToken(token, user.email)
    return {
      access_token: token,
    };
  }

  async enviarTokenPorEmail(email: string) {
    const token = String;
    try {
      // Gerar o texto do e-mail com o token
      const text = `Seu token de autenticação é: ${token}`;

      // Enviar o e-mail com o token
      await this.emailService.sendEmail(email, 'Token de Autenticação', text);
    } catch (err) {
      console.error(`Erro ao enviar e-mail com token: ${err.message}`);
      throw err;
    }
  }

  async verificarToken(email: string, token: string): Promise<boolean> {
    // Lógica de verificação do token aqui

    // Exemplo de verificação usando a biblioteca speakeasy
    const secret = jwtConstants.secret; // Substitua pelo seu próprio segredo
    const isValid = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });

    return isValid;
  }
}
