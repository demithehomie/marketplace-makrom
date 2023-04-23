// import { Injectable } from '@nestjs/common';
// import axios from 'axios';
// import { Sms } from './sms';

// require('dotenv').config();
// const HASH_SMS_MOBILE = process.env.HASH_SMS_MOBILE;

// @Injectable()
// export class SmsService {
//   private pendingCodes: { [phoneNumber: string]: string } = {};

//   private generateVerificationCode(): string {
//     const randomNumber = Math.floor(Math.random() * 100000);
//     return randomNumber.toString().padStart(5, '0');
//   }

//   async sendSms(data: Sms): Promise<string> {
//     const verificationCode = this.generateVerificationCode();
//     const mensagem = `Seu código de verificação é ${verificationCode}. Não compartilhe com ninguém.`;
//     const response = await axios.post(
//       'https://app.websms.com.br/sms/shortcode/routes/sms.php',
//       {
//         mensagem,
//         acao: data.acao,
//         numero: data.numero,
//         hash: HASH_SMS_MOBILE,
//       },
//     );
//     if (response.data === '{ status: "Enviado" }') {
//       return verificationCode;
//     } else {
//       throw new Error(`Failed to send SMS: ${response}`);
//     }
//   }

//   async validateVerificationCode(
//     phoneNumber: string,
//     verificationCode: string,
//   ): Promise<boolean> {
//     const pendingCode = this.pendingCodes[phoneNumber];
//     if (pendingCode === verificationCode) {
//       delete this.pendingCodes[phoneNumber];
//       return true;
//     } else {
//       return false;
//     }
//   }
// }
