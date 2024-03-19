const Gestor = require("../models/gestor");

exports.criarGestor = async (req, res) => {
  try {
    const { nome, email, senha, cargo, turma } = req.body;
    
    const emailExistente = await Gestor.findOne({
      where: {
        email:email
      }
    })

    if(emailExistente){
      return res.status(400).json({ error: "Email já cadastrado!" })};
    

    const novoGestor = await Gestor.create({ nome, email, senha, cargo, turma });

    res.status(201).json({ newGestorId: novoGestor.id, message: "Gestor cadastrado com sucesso" });
  } catch (error) {
    console.error('Erro no bloco try-catch:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Erro ao cadastrar Gestor" });
    }
  }
};



