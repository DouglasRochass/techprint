const Gestor = require('../models/gestor'); // Importe o modelo de usuário
const bcrypt = require('bcrypt')


exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifique se o usuário existe no banco de dados
    const GestorEncontrado = await Gestor.findOne({
      where: {
        email: email,
      },
    });

    // Se o usuário não foi encontrado, retorne uma mensagem de erro
    if (!GestorEncontrado) {
      return res.status(401).json({ message: 'Gestor ou  Senha inválidos' });
    }

    // Verifique se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, GestorEncontrado.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Gestor  ou senha incorreto(s)' });
    } 

    // Se chegou até aqui, o login foi bem-sucedido
    return res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
};