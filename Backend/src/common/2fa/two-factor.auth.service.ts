import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as speakeasy from 'speakeasy';

@Injectable()
export class TwoFactorAuthService {
  constructor(private readonly prisma: PrismaService) {}

  async generateSecret() {
    const secret = speakeasy.generateSecret({ length: 20 });
    return secret.base32;
  }

  async generateToken() {
    return speakeasy.totp({
      secret: speakeasy.generateSecret({ length: 20 }).base32,
      digits: 6,
    });
  }

  async verifyToken(email: string, token: string) {
    const user = await this.prisma.getClient().user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });
  }
}
