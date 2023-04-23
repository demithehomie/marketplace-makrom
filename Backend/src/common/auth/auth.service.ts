import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.prisma.getClient().user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValidPassword = await bcrypt.compare(senha, user.senha);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    return user;
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
