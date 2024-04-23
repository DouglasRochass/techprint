// newPasswordController.js

const Usuario = require('../models/usuarios');
const Gestor = require('../models/gestor');
const { where } = require('sequelize');

exports.getAllUsers = async (req, res) => {
  try {
    const usersUsuarios = await Usuario.findAll();
    const usersGestor = await Gestor.findAll();

    const allUsers = [...usersUsuarios, ...usersGestor];


    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) =>{
  const {email} = req.params
  try{
    const user = await Usuario.findOne({where: {email} })
    const gestor = await Gestor.findOne({where: {email} })

    if(user){
      await Usuario.destroy({where: {email}})
      return res.json({message: 'Usuário excluído com sucesso'})
    }else if(gestor){
      await Gestor.destroy({where: {email}})
      return res.json({message: 'Gestor excluído com sucesso'})
    }else{
      return res.status(404).json({message: 'Usuário não encontrado'})
    }
  } catch(error){
    console.error('Error ao excluir usuário:', error)
    res.status(500).json({error: 'Erro interno do servidor'})
  }

}