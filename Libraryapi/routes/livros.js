const express = require('express');
const router = express.Router();
const { Livros } = require('../models'); // Certifique-se de que isso está correto

// Listar todos os livros
router.get("/", async (req, res) => {
  try {
    const livros = await Livros.findAll(); // Corrigido para usar 'Livros' diretamente
    res.json(livros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar um novo livro
router.post("/", async (req, res) => {
  try {
    const { titulo, autor, genero, anoPublicacao } = req.body;
    if (!titulo || !autor || !anoPublicacao) {
      return res.status(400).json({ error: "Campos 'titulo', 'autor' e 'anoPublicacao' são obrigatórios" });
    }
    const novoLivro = await Livros.create({ titulo, autor, genero, anoPublicacao });
    res.status(201).json(novoLivro);
  } catch (err) {
    console.error('Erro ao criar livro:', err);
    res.status(500).json({ error: err.message });
  }
});

// Atualizar um livro existente
router.put("/:id", async (req, res) => {
  try {
    const livro = await Livros.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: "Livro não encontrado" });
    await livro.update(req.body);
    res.json(livro);
  } catch (err) {
    console.error('Erro ao atualizar livro:', err);
    res.status(500).json({ error: err.message });
  }
});

// Deletar um livro
router.delete("/:id", async (req, res) => {
  try {
    const livro = await Livros.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: "Livro não encontrado" });
    await livro.destroy();
    res.status(204).end();
  } catch (err) {
    console.error('Erro ao deletar livro:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
