const Usuario = require('../models/usuarios'); // Importe o modelo de usuário
const Gestor = require('../models/gestor'); // Importe o modelo de gestor

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
      return res.status(200).json({ message: 'Login bem-sucedido como gestor' });
    }

    // Verifique se a senha está correta para o usuário comum
    if (usuarioEncontrado.senha !== senha) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Se chegou até aqui, o login foi bem-sucedido como usuário comum
    return res.status(200).json({ message: 'Login bem-sucedido como usuário comum' });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
};
