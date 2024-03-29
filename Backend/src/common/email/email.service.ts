import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

require('dotenv').config();
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
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
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
    return await transporter.sendMail(options);
  }

  async sendTwoFactorToken(email, token) {
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
