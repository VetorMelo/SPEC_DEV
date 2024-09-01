const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS
app.use(cors());
app.use(express.static('uploads'));

// Configuração do armazenamento de arquivos usando multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Rota para upload de documentos
app.post('/upload', upload.single('docFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    res.status(200).send({ message: 'Documento enviado com sucesso!', filename: req.file.filename });
});

// Rota para listar documentos
app.get('/documents', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            return res.status(500).send('Erro ao listar documentos.');
        }
        res.status(200).json(files);
    });
});

// Rota para download de documentos
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const file = path.join(__dirname, 'uploads', filename);
    res.download(file);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
