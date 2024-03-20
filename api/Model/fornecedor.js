const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/index'); 

const Fornecedor = sequelize.define('fornecedors', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  nomeAnterior: {
    type: DataTypes.STRING,
    allowNull: true,
  }, 
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Fornecedor;