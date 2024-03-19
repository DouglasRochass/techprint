const express = require ('express');
const criarGestor = require('../controller/cadastroGestor')

const router = express.Router()

router.post('/', criarGestor.criarGestor)

module.exports= router