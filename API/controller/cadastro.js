const Usuario = require("../models/usuarios");

exports.criarUser = async (req, res) => {
  try {
    const { nome, email, senha, cargo, turma } = req.body;
    
    const emailExistente = await Usuario.findOne({
      where: {
        email:email
      }
    })

    if(emailExistente){
      return res.status(400).json({ error: "Email já cadastrado!" })};
    

    const novoUsuario = await Usuario.create({ nome, email, senha, cargo, turma });

    res.status(201).json({ newUserId: novoUsuario.id, message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error('Erro no bloco try-catch:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Erro ao cadastrar usuário" });
    }
  }
};



