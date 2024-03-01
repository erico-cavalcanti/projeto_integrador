const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 3000;

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('pedidos.db');

// Criação da tabela de pedidos
db.run(`CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT,
    pedido TEXT,
    telefone TEXT,
    valor REAL
)`);

// Middleware para análise de corpos JSON
app.use(express.json());

// Middleware do CORS
app.use(cors());

// Servindo arquivos estáticos
app.use(express.static('.'));

// Rota para registrar um novo pedido
app.post('/pedidos', (req, res) => {
    const { cliente, pedido, telefone, valor } = req.body;
    db.run('INSERT INTO pedidos (cliente, pedido, telefone, valor) VALUES (?, ?, ?, ?)', [cliente, pedido, telefone, valor], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Pedido registrado com sucesso!', pedido_id: this.lastID });
    });
});

// Rota para consultar todos os pedidos
app.get('/pedidos', (req, res) => {
    db.all('SELECT * FROM pedidos', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
