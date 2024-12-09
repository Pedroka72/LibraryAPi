const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); 

const livrosRouter = require('./routes/livros');
const emprestimosRouter = require('./routes/emprestimos');
const usuarioRouter = require('./routes/usuario'); 

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Bem-vindo à API da Biblioteca!');
});

app.use('/livros', livrosRouter);
app.use('/emprestimos', emprestimosRouter);
app.use('/usuarios', usuarioRouter); 

db.sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
    .catch((error) => console.error('Erro ao conectar ao banco de dados:', error));

db.sequelize.sync({ alter: true, force: false }) 
    .then(() => console.log('Tabelas sincronizadas com sucesso!'))
    .catch((error) => console.error('Erro ao sincronizar tabelas:', error));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
