const express = require('express');
const nodemailer = require('nodemailer');
const Usuario = require('../models/usuarios'); // Importe o modelo de usuário do seu banco de dados
const Gestor = require("../models/gestor")
require('dotenv').config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.senha
    }
});

// Rota para lidar com a solicitação de recuperação de senha
router.post('/recuperar-senha', async (req, res) => {
    const { email } = req.body;

    try {
        // Verificar se o e-mail do usuário existe no banco de dados
        const usuario = await Usuario.findOne({ where: { email: email } });
        const gestor = await Gestor.findOne({ where: { email: email } });


        if (!usuario || !gestor) {
            return res.status(404).json({ message: 'E-mail não encontrado' });
        }

        // Gerar um link de recuperação de senha com o token
        const linkRecuperacaoSenha = 'http://localhost/recuperar-senha?token=seu_token';

        // Definir opções de e-mail
        const mailOptions = {
            from: process.env.email,
            to: email,
            subject: 'Recuperação de Senha',
            html: `<p>Olá,</p><p>Para recuperar sua senha, clique no seguinte link:</p><p><a href="${linkRecuperacaoSenha}">${linkRecuperacaoSenha}</a></p>`
        };

        // Enviar o e-mail
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail de recuperação de senha enviado com sucesso' });
    } catch (error) {
        console.error('Erro ao enviar o e-mail de recuperação de senha:', error);
        res.status(500).json({ message: 'Erro ao enviar o e-mail de recuperação de senha' });
    }
});

module.exports = router;
