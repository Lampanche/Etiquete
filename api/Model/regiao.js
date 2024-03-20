const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/index'); 

const Regiao = sequelize.define('regiaos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Regiao;