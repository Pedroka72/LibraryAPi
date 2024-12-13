const express = require('express');
const router = express.Router();
const { Usuario } = require('../models'); 

// Listar todos os usuários
router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Criar um novo usuário
router.post('/', async (req, res) => {
    console.log('Corpo da requisição:', req.body); 
    try {
        const novoUsuario = await Usuario.create(req.body);
        res.status(201).json(novoUsuario);
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Buscar um usuário específico por ID
router.get("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
        res.json(usuario);
    } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

// Atualizar um usuário existente
router.put("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

        const usuarioAtualizado = await usuario.update(req.body);
        res.json(usuarioAtualizado);
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// Deletar um usuário
router.delete("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

        await usuario.destroy();
        console.log(`Usuário com ID ${req.params.id} foi excluído com sucesso.`);
        res.status(204).end();
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

module.exports = router;
 
