require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'loja_moveis'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota para listar os móveis
app.get('/api/moveis', (req, res) => {
    db.query('SELECT * FROM movel', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar móveis.');
        } else {
            res.json(results);
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
