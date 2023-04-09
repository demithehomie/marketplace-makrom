const express = require('express');
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

// Configuração do Twilio
const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Geração do segredo compartilhado
const secret = speakeasy.generateSecret({ length: 20 });

// Rota para enviar a mensagem de texto com o token
app.post('/send', (req, res) => {
  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32'
  });

  const message = `Seu código de verificação de duas etapas é: ${token}`;

  client.messages
    .create({
      body: message,
      from: TWILIO_NUMBER,
      to: req.body.phone
    })
    .then(() => {
      res.send('Mensagem enviada com sucesso');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao enviar a mensagem');
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
app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});
