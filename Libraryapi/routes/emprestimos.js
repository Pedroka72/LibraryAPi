const express = require('express');
const router = express.Router();
const db = require('../models'); // Importa os modelos configurados
const { Usuario, Livros, Emprestimo, sequelize } = require('../models');

// Criar um novo empréstimo
router.post('/', async (req, res) => {
    console.log('Corpo da requisição:', req.body); // Adicione isso para depuração
    try {
        const { usuarioId, livroId, dataEmprestimo, dataDevolucao } = req.body;
        const MAX_EMPRESTIMOS = 3; // Defina o número máximo de empréstimos permitidos por usuário

        // Verifica se o usuário existe
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verifique se o livro existe
        const livro = await Livros.findByPk(livroId);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        // Verifique quantos empréstimos ativos o usuário tem
        const emprestimosAtivos = await Emprestimo.count({
            where: {
                usuarioId,
                status: 'pendente' // Ou qualquer outro status que indique um empréstimo ativo
            }
        });

        if (emprestimosAtivos >= MAX_EMPRESTIMOS) {
            return res.status(400).json({ error: `Limite de ${MAX_EMPRESTIMOS} empréstimos alcançado para este usuário` });
        }

        // Cria um novo empréstimo
        const novoEmprestimo = await Emprestimo.create({
            usuarioId,
            livroId,
            dataEmprestimo,
            dataDevolucao,
            status: 'pendente',
        });

        res.status(201).json(novoEmprestimo);
    } catch (err) {
        console.error('Erro ao criar empréstimo:', err);
        res.status(500).json({ error: 'Erro ao criar empréstimo' });
    }
});

// Listar todos os empréstimos
router.get('/', async (req, res) => {
    try {
        const emprestimos = await db.Emprestimo.findAll();
        res.status(200).json(emprestimos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/pendentes/:usuarioId', async (req, res) => {
    try {
        const { usuarioId } = req.params;

        if (!usuarioId) {
            return res.status(400).json({ error: 'ID do usuário não fornecido' });
        }

        // Verifica os empréstimos pendentes pelo status
        const emprestimosPendentes = await Emprestimo.findAll({
            where: { 
                usuarioId, 
                status: 'pendente' // Usando a coluna correta "status"
            },
            include: [
                { model: Usuario, as: 'usuario' }, // Ajuste para a relação correta
                { model: Livros, as: 'livro' } // Ajuste para a relação correta
            ],
        });

        if (emprestimosPendentes.length === 0) {
            return res.status(404).json({ error: 'Nenhum empréstimo pendente encontrado' });
        }

        res.json(emprestimosPendentes);
    } catch (err) {
        console.error('Erro ao buscar empréstimos pendentes:', err);
        res.status(500).json({ error: 'Erro ao buscar empréstimos pendentes' });
    }
});

router.get('/livros-mais-emprestados', async (req, res) => {
    try {
        const livrosMaisEmprestados = await Emprestimo.findAll({
            attributes: [
                'livroId',
                [sequelize.fn('COUNT', sequelize.col('livroId')), 'quantidadeEmprestimos'], // Contagem dos empréstimos
