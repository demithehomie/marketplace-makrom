import { Injectable } from '@nestjs/common';
import * as pug from 'pug';
import * as path from 'path';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor() {}
  
  async sendEmail(options) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-senha',
      },
    });
    return await transporter.sendMail(options);
  }
  
  async sendTwoFactorToken(email, token) {
    const compiledFunction = pug.compileFile(
      path.join(__dirname, '../templates/two-factor-token.pug')
    );
    const html = compiledFunction({ token });
    const options = {
      from: 'seu-email@gmail.com',
      to: email,
      subject: 'Seu código de verificação em dois fatores',
      html,
    };
    return await this.sendEmail(options);
  }
  
  async sendResetPasswordToken(email, token) {
    const compiledFunction = pug.compileFile(
      path.join(__dirname, '../templates/reset-password.pug')
    );
    const html = compiledFunction({ token });
    const options = {
      from: 'seu-email@gmail.com',
      to: email,
      subject: 'Redefinir senha',
      html,
    };
    return await this.sendEmail(options);
  }
}
