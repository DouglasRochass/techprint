const express = require('express');
const router = express.Router();
const userController = require('../controller/usuarios');
const authGestor = require('../middleware/auth')


router.get('/usuarios', userController.getAllUsers);
router.delete('/usuarios/:email', authGestor, userController.deleteUser)
module.exports = router;
