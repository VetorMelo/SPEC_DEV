const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint para upload de arquivo, deve aceitar POST
app.post('/upload', upload.single('docFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  const emails = ["autor@gmail.com", "checador@gmail.com", "aprovador@gmail.com", "contatomelo2@gmail.com"];
  const filePath = path.join(__dirname, 'uploads', req.file.filename);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'contatomelo2@gmail.com', // Substitua pelo seu e-mail
      pass: 'mudar123', // Substitua pela sua senha de aplicativo
    }
  });

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: emails.join(", "),
    subject: 'Novo documento enviado',
    text: 'Um novo documento foi enviado. Veja o anexo.',
    attachments: [
      {
        path: filePath
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error.message);
      return res.status(500).send('Erro ao enviar e-mail: ' + error.message);
    }
    console.log('E-mail enviado: ' + info.response);
    res.status(200).send('Arquivo enviado e e-mails enviados com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
