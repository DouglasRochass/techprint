const express = require('express')
const cadastrarUser = require('../controller/cadastro')

const router = express.Router()

router.post('/cadastro-user', cadastrarUser.criarUsuario)
router.post('/cadastro-gestor', cadastrarUser.criarGestor)


module.exports = router