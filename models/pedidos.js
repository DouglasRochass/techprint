// const { DataTypes } = require('sequelize');
// const sequelize = require('../db/conexao');
// const Usuario = require('./usuarios');


// const pedidos = sequelize.define('pedidos', {
//   nome_pedido: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   data: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   descri: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   tempo_impre: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//  user_id: { 
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Usuario, // Referência ao modelo Usuario
//       key: 'id'       // Chave primária do modelo Usuario
//     }
//   }
// }, {
//   timestamps: false,
//   freezeTableName: true
// });

// pedidos.sync();


// module.exports = pedidos;


const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexao');
const Usuario = require('./usuarios'); // Importe o modelo Usuario aqui

const Pedidos = sequelize.define('Pedidos', {
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
  user_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

Pedidos.belongsTo(Usuario); // Associação entre Pedidos e Usuario

module.exports = Pedidos;
 
