// newPasswordController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const Gestor = require('../models/gestor');
require('dotenv').config();

const JWT_SECRET = process.env.TOKEN;

async function atualizarSenha(req, res) {
    const token = req.query.token; // Obtendo o token do parâmetro da consulta

    if (!token) {
        return res.status(400).send("Token não fornecido.");
    }

    const { novaSenha } = req.body;

    try {
        // Verificar se o token é válido
        const decoded = jwt.verify(token, JWT_SECRET);

        // Verificar se o usuário existe com base no e-mail do token
        const usuario = await Usuario.findOne({ where: { email: decoded.email } });
        const gestor = await Gestor.findOne({ where: { email: decoded.email } });

        if (usuario || gestor) {
            // Hash da nova senha
            const hashedSenha = await bcrypt.hash(novaSenha, 10);

            // Atualizar a senha do usuário/gestor
            if (usuario) {
                await Usuario.update({ senha: hashedSenha }, { where: { email: decoded.email } });
            } else {
                await Gestor.update({ senha: hashedSenha }, { where: { email: decoded.email } });
            }

            res.send("Senha atualizada com sucesso.");
        } else {
            res.status(404).send("Usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        res.status(500).send("Ocorreu um erro ao atualizar a senha.");
    }
}

module.exports = {
    atualizarSenha
};
