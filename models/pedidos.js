const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexao');

const pedidos = sequelize.define('pedidos', {
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descri: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tempo_impre: {
    type: DataTypes.TIME,
    allowNull: false
  },
  impre_usando: {
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

pedidos.sync();
module.exports = pedidos;
