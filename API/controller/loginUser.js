const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken'); // Importe o pacote 'jsonwebtoken'
const Usuario = require('../models/usuarios'); // Importe o modelo de usuário
const Gestor = require('../models/gestor'); // Importe o modelo de gestor
require("dotenv").config()
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifique se o usuário existe na tabela de usuários
    const usuarioEncontrado = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    // Se o usuário não foi encontrado na tabela de usuários, verifique na tabela de gestores
    if (!usuarioEncontrado) {
      const gestorEncontrado = await Gestor.findOne({
        where: {
          email: email,
        },
      });

      if (!gestorEncontrado) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      // Verifique se a senha está correta para o gestor
      if (gestorEncontrado.senha !== senha) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      // Se chegou até aqui, o login foi bem-sucedido como gestor
      // Gere o token de API para o gestor
      const token = jwt.sign({ id: gestorEncontrado.id, cargo: 'gestor' }, process.env.SECRET, { expiresIn: '1h' });

      return res.status(200).json({ message: 'Login bem-sucedido como gestor', token: token });
    }

    // Verifique se a senha está correta para o usuário comum
    if (usuarioEncontrado.senha !== senha) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Se chegou até aqui, o login foi bem-sucedido como usuário comum
    // Gere o token de API para o usuário comum
    const token = jwt.sign({ id: usuarioEncontrado.id, cargo: 'usuario' }, process.env.SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login bem-sucedido como usuário comum', token: token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
};
