const express = require('express')
const autenticador = require('../controller/loginUser')
const router = express.Router()

router.post('/', autenticador.login)

module.exports = router