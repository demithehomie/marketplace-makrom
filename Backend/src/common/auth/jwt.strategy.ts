import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // substituir pela sua chave secreta
    });
  }

  async validateClient(payload: any) {
    const client = await this.prisma.getClient().client.findUnique({ where: { id: payload.sub } });
    return client;
  }
  
  async validateProvider(payload: any) {
    const provider = await this.prisma.getClient().provider.findUnique({ where: { id: payload.sub } });
    return provider;
  }

}
