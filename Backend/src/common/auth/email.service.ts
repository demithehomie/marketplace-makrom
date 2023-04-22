import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class EmailService {
  constructor() {}

  async sendEmail(options) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    return await transporter.sendMail(options);
  }

  async sendTwoFactorToken(email, token) {
    const html = `<html><body><p>Seu código de verificação em dois fatores é: ${token}</p></body></html>`;
    const options = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Seu código de verificação em dois fatores',
      html,
    };
    return await this.sendEmail(options);
  }

  async sendResetPasswordToken(email, token) {
    const html = `<html><body><p>Seu código para redefinição de senha é: ${token}</p></body></html>`;
    const options = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Redefinir senha',
      html,
    };
    return await this.sendEmail(options);
  }
}
