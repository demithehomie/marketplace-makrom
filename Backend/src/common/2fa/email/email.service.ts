import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor(private configService: ConfigService) {
    // Configurar o transporter com os valores do arquivo .env
    this.transporter = createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: this.configService.get('SMTP_SECURE'),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      // Enviar o e-mail
      await this.transporter.sendMail({
        from: this.configService.get('SMTP_USER'),
        to,
        subject,
        text,
      });
      console.log(`E-mail enviado para ${to} com sucesso!`);
    } catch (err) {
      console.error(`Erro ao enviar e-mail para ${to}: ${err.message}`);
      throw err;
    }
  }
}
