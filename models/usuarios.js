// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../db/conexao');



// const usuario = sequelize.define('Usuario', {
//   nome: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email:{
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false
//   },
//   senha: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   cargo:{
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   turma: {
//     type: DataTypes.STRING
//   }
// },
// {
//   // Para não criar a coluna createdAt e updateAt do sequelize e 
//   // também para não pluralizar a tabela 
//   timestamps: false,
//   freezeTableName: true
// });


// usuario.sync();

// module.exports = usuario;

const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexao');
const Pedidos = require('./pedidos'); // Importe o modelo Pedidos aqui

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo:{
    type: DataTypes.STRING,
    allowNull: false
  },
  turma: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true
});

Usuario.hasMany(Pedidos); // Associação entre Usuario e Pedidos

module.exports = Usuario;

