import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { TokenController } from '../token/token.controller';

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
  const payload = { sub: usuario.id, email: usuario.email };
  const token = this.jwtService.sign(payload);
  if (usuario.email) {
    this.token.saveToken(token, usuario.email);
  }
  return {
    access_token: token,
  };
}


}
