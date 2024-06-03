const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexao');
const Usuario = require('./usuarios');


const pedidos = sequelize.define('pedidos', {
  nome_pedido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descri: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tempo_impre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: { // Novo campo para armazenar o ID do usuário
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

pedidos.belongsTo(Usuario)
pedidos.sync();
module.exports = pedidos;
