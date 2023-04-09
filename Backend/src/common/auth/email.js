const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuração do serviço de e-mail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// Geração do segredo compartilhado
const secret = speakeasy.generateSecret({ length: 20 });

// Rota para enviar o e-mail com o token
app.post('/send', (req, res) => {
  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32'
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: req.body.email,
    subject: 'Código de verificação em duas etapas',
    text: `Seu código de verificação de duas etapas é: ${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erro ao enviar o e-mail');
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.send('E-mail enviado com sucesso');
    }
  });
});

// Rota para verificar se o token está correto
app.post('/verify', (req, res) => {
  const verified = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token: req.body.token,
    window: 6
  });

  if (verified) {
    res.send('Token válido');
  } else {
    res.status(400).send('Token inválido');
  }
});

// Inicializa o servidor
app.listen(3002, () => {
  console.log('Servidor iniciado na porta 3002');
});
