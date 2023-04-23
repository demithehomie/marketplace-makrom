// import { Body, Controller, Post } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { PrismaService } from '../prisma/prisma.service';
// import { EmailService } from './email.service';
// import { SmsService } from './sms.service';
// import { Sms } from '../sms/sms';

// @Controller()
// export class PasswordResetController {
//   private pendingCodes = {};

//   constructor(
//     private readonly emailService: EmailService,
//     private readonly prismaService: PrismaService,
//     private readonly smsService: SmsService,
//   ) {}

//   @Post('auth/password-reset/email-request')
//   async requestPasswordReset(@Body() { email }) {
//     const user = await this.prismaService
//       .getClient()
//       .client.findUnique({ where: { email } });
//     if (!user) {
//       throw new Error('Usuário não encontrado');
//     }
//     const speakeasy = require('speakeasy');
//     const token = speakeasy.totp({
//       secret: speakeasy.generateSecret({ length: 20 }).base32,
//       digits: 6,
//     });
//     await this.prismaService.getClient().client.update({
//       where: { email: user.email },
//       data: {
//         resetPasswordToken: token,
//         resetPasswordTokenExpiresAt: new Date(Date.now() + 3600000),
//       }, // expires in 1 hour
//     });
//     await this.emailService.sendResetPasswordToken(user.email, token);
//     return { message: 'Email enviado com instruções para redefinir a senha' };
//   }

//   @Post('auth/password-reset/email-confirm')
//   async confirmPasswordReset(@Body() { token }) {
//     const user = await this.prismaService
//       .getClient()
//       .client.findUnique({ where: { resetPasswordToken: token } });
//     if (!user || user.resetPasswordTokenExpiresAt < new Date()) {
//       throw new Error('Token inválido ou expirado');
//     }
//     const passwordHash = await bcrypt.hash(user.senha, 8);
//     await this.prismaService.getClient().client.update({
//       where: { email: user.email },
//       data: {
//         senha: passwordHash,
//         resetPasswordToken: '0',
//         resetPasswordTokenExpiresAt: new Date(Date.now()),
//       },
//     });
//     return { message: 'Senha redefinida com sucesso' };
//   }

//   @Post('auth/password-reset/sms-request')
//   async sendSms(@Body() data: Sms): Promise<string> {
//     const verificationCode = await this.smsService.sendSms(data);
//     return verificationCode;
//   }

//   @Post('auth/password-reset/sms-confirm')
//   async validateVerificationCode(
//     @Body('phoneNumber') phoneNumber: string,
//     @Body('verificationCode') verificationCode: string,
//   ): Promise<boolean> {
//     const isValid = await this.smsService.validateVerificationCode(
//       phoneNumber,
//       verificationCode,
//     );
//     return isValid;
//   }
// }
