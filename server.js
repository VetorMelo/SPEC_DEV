const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET_KEY = '12345'; // Use uma chave secreta forte

app.use(cors()); // Permite requisições de outros domínios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock Database
let users = [
    { email: 'contatomelo2@gmail.com', password: bcrypt.hashSync('sara123', 8) } // Exemplo de usuário
];

// Endpoint para autenticação
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Email ou senha incorretos' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
