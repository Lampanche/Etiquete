const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/index'); 

const Modelo = sequelize.define('modelos', {
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

module.exports = Modelo;