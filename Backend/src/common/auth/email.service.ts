import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  constructor() {}

  async sendEmail(options) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'allafsendmail@gmail.com',
        pass: 'uvufcxabcajebfjj',
      },
    });
    return await transporter.sendMail(options);
  }

  async sendTwoFactorToken(email, token) {
    const html = `<html><body><p>Seu código de verificação em dois fatores é: ${token}</p></body></html>`;
    const options = {
      from: 'allafsendmail@gmail.com',
      to: email,
      subject: 'Seu código de verificação em dois fatores',
      html,
    };
    return await this.sendEmail(options);
  }

  async sendResetPasswordToken(email, token) {
    const options = {
      from: 'allafsendmail@gmail.com',
      to: email,
      subject: 'Redefinir senha',
      template: 'email',
      context: {
        code: token,
      },
    };
    return await this.sendEmail(options);
  }
}
