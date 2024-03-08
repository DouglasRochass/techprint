const Usuario = require('../models/usuarios'); // Importe o modelo de usuário


exports.findByEmail = async (req, res) => {
    try {
      const { email } = req.params;
  
      const usuarios = await Usuario.findAll({
        where: { email }
      });
  
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      res.status(500).json({ message: "Erro ao buscar usuários por email" });
    }
  };
  
  exports.attuser = async (req, res) => {
    try {
      const idUsuario = req.params.id;
      const { nome, email, senha, cargo, turma} = req.body;
  
      const updatedUser = await Usuario.update({
        nome,
         email,
          senha,
          cargo,
          turma
      }, {
        where: { id: idUsuario }
      });
  
      res.status(200).json({ message: "usuário atualizado com sucesso" });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const idUsuario = req.params.id;
  
      await Usuario.delete({
        where: { id: idUsuario }
      });
  
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error('Erro ao deletar Usuário:', error);
      res.status(500).json({ message: "Erro ao deletar Usuário" });
    }
  };