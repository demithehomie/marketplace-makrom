import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenController } from '../token/token.controller';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private token: TokenController,
  ) {}

  async validateClient(email: string, senha: string): Promise<any> {
    const client = await this.prisma
      .getClient()
      .client.findUnique({ where: { email } });
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
    const provider = await this.prisma
      .getClient()
      .provider.findUnique({ where: { email } });
    if (!provider) {
      throw new UnauthorizedException();
    }
    const isValidPassword = await bcrypt.compare(senha, provider.senha);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    return provider;
  }

  async login(usuario: any) {
    if (!usuario || !usuario.email || !usuario.senha) {
      throw new BadRequestException('Dados de login inválidos');
    }
    const payload = { sub: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload);
    this.token.saveToken(token, usuario.email);
    return {
      access_token: token,
    };
    
  }
}
