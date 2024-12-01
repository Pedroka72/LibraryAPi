const express = require('express');
const router = express.Router();
const db = require('../models'); // Importa os modelos configurados
const Emprestimo = db.Emprestimo;


router.get('/test', async (req, res) => {
    try {
        const emprestimos = await Emprestimo.findAll();
        res.status(200).json(emprestimos);
    } catch (error) {
        console.error('Erro ao buscar empréstimos:', error);
        res.status(500).json({ error: 'Erro ao buscar empréstimos' });
    }
});

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

module.exports = router;

// Criar um novo empréstimo
router.post('/', async (req, res) => {
    console.log('Corpo da requisição:', req.body); // Adicione isso para depuração
    try {
        const { usuarioId, livroId, dataEmprestimo, dataDevolucao } = req.body;
        const MAX_EMPRESTIMOS = 3; // Defina o número máximo de empréstimos permitidos por usuário

        // Verifique se o usuário existe
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

        // Verifica se o status já foi marcado como devolvido
        if (emprestimo.status === 'devolvido') {
            return res.status(400).json({ message: 'Este livro já foi devolvido' });
        }

        // Atualiza o status do empréstimo e define a data de devolução
        emprestimo.status = 'devolvido';
        emprestimo.dataDevolucao = new Date(); // Você pode definir uma data personalizada se necessário

        await emprestimo.save(); // Salva as alterações no banco de dados

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
        res.status(204).end(); // Retorna uma resposta sem conteúdo
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;