const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/index'); 

const Tamanho = sequelize.define('tamanhos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Tamanho;