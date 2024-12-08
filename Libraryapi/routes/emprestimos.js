const express = require('express');
const router = express.Router();
const db = require('../models'); 

const { Usuario, Livros, Emprestimo, sequelize } = require('../models');

// Criar um novo empréstimo
router.post('/', async (req, res) => {
    console.log('Corpo da requisição:', req.body); // Adicione isso para depuração
    try {
        const { usuarioId, livroId, dataEmprestimo, dataDevolucao } = req.body;
        const MAX_EMPRESTIMOS = 3; 
    
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const livro = await Livros.findByPk(livroId);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        const emprestimosAtivos = await Emprestimo.count({
            where: {
                usuarioId,

                status: 'pendente' 

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

//Empréstimos pendentes por usuário

router.get('/pendentes/:usuarioId', async (req, res) => {
    try {
        const { usuarioId } = req.params;

        if (!usuarioId) {
            return res.status(400).json({ error: 'ID do usuário não fornecido' });
        }

        const emprestimosPendentes = await Emprestimo.findAll({
            where: { 
                usuarioId, 
                status: 'pendente' 
            },
            include: [
                { model: Usuario, as: 'usuario' }, 
                { model: Livros, as: 'livro' } 

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

//livros mais emprestados
router.get('/livros-mais-emprestados', async (req, res) => {
    try {
        const livrosMaisEmprestados = await Emprestimo.findAll({
            attributes: [
                'livroId',

                [sequelize.fn('COUNT', sequelize.col('livroId')), 'quantidadeEmprestimos'], 
            ],
            where: { status: 'pendente' }, 
            include: [
                {
                    model: Livros,
                    as: 'livro', 
                    attributes: ['id', 'titulo', 'autor'], 
                },
            ],
            group: ['livroId', 'livro.id', 'livro.titulo', 'livro.autor'],
            order: [[sequelize.col('quantidadeEmprestimos'), 'DESC']], 
            limit: 10, 
        });

        if (livrosMaisEmprestados.length === 0) {
            return res.status(404).json({ error: 'Nenhum livro encontrado nos empréstimos' });
        }

        res.status(200).json(livrosMaisEmprestados);
    } catch (err) {
        console.error('Erro ao buscar livros mais emprestados:', err);
        res.status(500).json({ error: 'Erro ao buscar livros mais emprestados' });
    }
});

// Buscar um empréstimo específico por ID
router.get('/:id', async (req, res) => {
    try {
        const emprestimo = await db.Emprestimo.findByPk(req.params.id);
        if (!emprestimo) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
        res.status(200).json(emprestimo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Atualizar um empréstimo existente por ID
router.put('/:id', async (req, res) => {
    try {
        const emprestimo = await db.Emprestimo.findByPk(req.params.id);
        if (!emprestimo) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
        const emprestimoAtualizado = await emprestimo.update(req.body);
        res.status(200).json(emprestimoAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/devolver/:id', async (req, res) => {
    try {
        const emprestimo = await Emprestimo.findByPk(req.params.id);

        if (!emprestimo) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }

        
        if (emprestimo.status === 'devolvido') {
            return res.status(400).json({ message: 'Este livro já foi devolvido' });
        }

        emprestimo.status = 'devolvido';
        emprestimo.dataDevolucao = new Date(); 

        await emprestimo.save();  

        res.status(200).json({ message: 'Livro devolvido com sucesso', emprestimo });
    } catch (error) {
        console.error('Erro ao registrar devolução:', error);
        res.status(500).json({ error: 'Erro ao registrar devolução' });
    }
});

// Deletar um empréstimo por ID
router.delete('/:id', async (req, res) => {
    try {
        const emprestimo = await db.Emprestimo.findByPk(req.params.id);
        if (!emprestimo) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
        await emprestimo.destroy();
        res.status(204).end(); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
