import { Injectable } from '@nestjs/common';
import { createTransport, Transporter  } from 'nodemailer';
import * as dotenv from 'dotenv';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    dotenv.config();
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      // Enviar o e-mail
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
      });
      console.log(`E-mail enviado para ${to} com sucesso!`);
    } catch (err) {
      console.error(`Erro ao enviar e-mail para ${to}: ${err.message}`);
      throw err;
    }
  }
}
