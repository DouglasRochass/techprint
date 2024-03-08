const express = require('express')
const cadastrarUser = require('../controller/cadastro')

const router = express.Router()

router.post('/', cadastrarUser.criarUser)


module.exports = router