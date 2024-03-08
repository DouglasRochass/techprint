const express = require('express');
const router = express.Router();
const usuario = require('../controller/usuarios');

// Rota para buscar produtos por categoria
router.get('/buscar/:email', usuario.findByEmail);

// Rota para atualizar um produto existente
router.put('/atualizar/:id', usuario.attuser)

// Rota para deletar um produto existente
router.delete('/deletar/:id', usuario.deleteUser)
// Outras rotas para ler, atualizar e deletar documentos
// ...

module.exports = router;