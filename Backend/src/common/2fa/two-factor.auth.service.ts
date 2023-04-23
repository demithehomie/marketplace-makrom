// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import * as speakeasy from 'speakeasy';

// @Injectable()
// export class TwoFactorAuthService {
//   constructor(private readonly prisma: PrismaService) {}

//   async generateSecret() {
//     const secret = speakeasy.generateSecret({ length: 20 });
//     return secret.base32;
//   }

//   async generateToken(secret: string) {
//     return speakeasy.totp({
//       secret,
//       encoding: 'base32',
//     });
//   }

//   async verifyToken(email: string, token: string) {
//     const user = await this.prisma.getClient().client.findUnique({ where: { email } });
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return speakeasy.totp.verify({
//       secret: user.twoFactorSecret,
//       encoding: 'base32',
//       token,
//       window: 1,
//     });
//   }
// }
