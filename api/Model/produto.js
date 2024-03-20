const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/index'); 
const Fornecedor = require('../Model/fornecedor')
const Modelo = require('../Model/modelo')
const Tamanho = require('../Model/tamanho')
const Tipo = require('../Model/tipo')
const Regiao = require('../Model/regiao')

const Produto = sequelize.define('produtos',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   nomeAnterior: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  codigoAnterior: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ativo:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  descricao:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  comNota:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  ano:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  precoCusto:{
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  precoVenda:{
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  estoque:{
    type: DataTypes.INTEGER,
    allowNull: true,
  }

})

Produto.belongsTo(Fornecedor, { foreignKey: 'fornecedorId' });
Produto.belongsTo(Tamanho, { foreignKey: 'tamanhoId' });
Produto.belongsTo(Tipo, { foreignKey: 'tipoId' });
Produto.belongsTo(Regiao, { foreignKey: 'regiaoId' });
Produto.belongsTo(Modelo, { foreignKey: 'modeloId' });

module.exports = Produto;