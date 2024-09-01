// server.js
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Configuração do Nodemailer para envio de e-mails
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para 465, false para outras portas
    auth: {
      user: 'contatomelo2@gmail.com', // seu e-mail
      pass: 'mudar123', // senha de aplicativo
    }
  });
  

app.use(express.static('public'));
app.use(express.json());

// Rota para o upload de arquivos
app.post('/upload', upload.single('docFile'), (req, res) => {
    const emails = ["autor@gmail.com", "checador@gmail.com", "aprovador@gmail.com", "contatomelo2@gmail.com"];
    const filePath = path.join(__dirname, 'uploads', req.file.filename);

  // Configurações de e-mail
  const mailOptions = {
    from: 'contatomelo2@gmail.com', // seu e-mail
    to: emails.join(", "),
    subject: 'Novo documento enviado',
    text: 'Um novo documento foi enviado. Veja o anexo.',
    attachments: [
      {
        path: filePath // Caminho do arquivo anexado
      }
    ]
  };

  // Envio de e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error); // Log detalhado de erros
      return res.status(500).send('Erro ao enviar e-mail: ' + error.toString());
    }
    console.log('E-mail enviado: ' + info.response);
    res.status(200).send('Arquivo enviado e e-mails enviados com sucesso!');
  });
});
