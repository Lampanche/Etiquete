const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/index'); 

const Tipo = sequelize.define('tipos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
  nomeAnterior: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Tipo;