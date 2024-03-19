// emailController.js
const nodemailerTransporter = require('../config/mailerconfig');
const Usuario = require('../models/usuarios');
const Gestor = require('../models/gestor');
const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();

const SENDER_EMAIL = "sla265827@gmail.com";
const JWT_SECRET = process.env.TOKEN;

async function enviarEmailRecuperacaoSenha(req, res) {
    const email = req.body.email;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        const gestor = await Gestor.findOne({ where: { email } });

        if (usuario || gestor) {
            // Gerar token com tempo de expiração de 15 minutos
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' });

            // Definir a data de expiração do token
            const resetTokenExpiresAt = moment().add(15, 'minutes').toDate();

            // Construir o URL para a página de redefinição de senha com o token
            const resetPasswordLink = `http://localhost:4000/redefinir-senha?token=${token}`;

            const resetPasswordEmailContent = {
                from: SENDER_EMAIL,
                to: email,
                subject: "Recuperação de senha",
                text: `Olá,\n\nVocê solicitou uma redefinição de senha. Por favor, clique no seguinte link para redefinir sua senha: ${resetPasswordLink}`,
                html: `<p>Olá,<br/><br/>Você solicitou uma redefinição de senha. Por favor, clique no seguinte link para redefinir sua senha: <a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`
            };

            const response = await nodemailerTransporter.sendMail(resetPasswordEmailContent);
            console.log("E-mail enviado com sucesso:", response);
            res.send("E-mail de recuperação de senha enviado com sucesso.");
        } else {
            res.status(404).send("E-mail não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao verificar e-mail:", error);
        res.status(500).send("Ocorreu um erro ao verificar o e-mail de recuperação de senha.");
    }
}

module.exports = {
    enviarEmailRecuperacaoSenha // Certifique-se de exportar a função corretamente
};
