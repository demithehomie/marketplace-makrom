import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

require('dotenv').config();
@Injectable()
export class EmailService {
  constructor() {}

  private compileTemplate(template: string, context: object): string {
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(context);
  }

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
      from: EMAIL_USER,
      to: email,
      subject: 'Seu código de verificação em dois fatores',
      html,
    };
    return await this.sendEmail(options);
  }

  async sendResetPasswordToken(email, token) {
    const templatePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'templates',
      'email.hbs',
    );
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = this.compileTemplate(template, { code: token });

    const options = {
      from: EMAIL_USER,
      to: email,
      subject: 'Redefinir senha',
      html,
    };
    return await this.sendEmail(options);
  }
}
