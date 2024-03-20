const fornecedors = require('../Model/fornecedor')
const tipos = require('../Model/tipo')
const tamanhos = require('../Model/tamanho')
const modelos = require('../Model/modelo')
const regiao = require('../Model/regiao')
const sequelize = require('sequelize')
const {Op} = require('sequelize')
const fs = require('fs');

class QueryUtils{
    static async codigoModelo(codigo,tabela){
     let codigoTabela = null;
     if(tabela == 'tamanho'){      
        codigoTabela = await tamanhos.findOne({
          where:{
            codigo:codigo
          }
        }) 
     }
     if(tabela == 'tipo'){
      codigoTabela = await tipos.findOne({
        where:{
          codigo:codigo
        }
      }) 
     }

     if(tabela == 'fornecedor'){
      codigoTabela = await fornecedors.findOne({
        where:{
          codigo:codigo
        }
      }) 
     }
     if(tabela == 'modelo'){
      codigoTabela = await modelos.findOne({
        where:{
          codigo:codigo
        }
      }) 
     }
     if(tabela == 'regiao'){
      codigoTabela = await regiao.findOne({
        where:{
          codigo:codigo
        }
      }) 
     }
        return codigoTabela;
  }

  

  static async autoCompleteCampo(tabela,str){ 
    if(tabela == 'tamanho'){
      const resultados = await tamanhos.findAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn('LOWER', sequelize.col('nome')),
              { [Op.like]: `%${str.toLowerCase()}%` }
            ),
            { ativo: true } // Condição para 'ativo' igual a true
          ]
        }
      });
      return resultados;
    }
    if(tabela == 'fornecedor'){
      const resultados = await fornecedors.findAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn('LOWER', sequelize.col('nome')),
              { [Op.like]: `%${str.toLowerCase()}%` }
            ),
            { ativo: true } // Condição para 'ativo' igual a true
          ]
        }
      });
      return resultados;
    }
    if(tabela == 'regiao'){
      const resultados = await regiao.findAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn('LOWER', sequelize.col('nome')),
              { [Op.like]: `%${str.toLowerCase()}%` }
            ),
            { ativo: true } // Condição para 'ativo' igual a true
          ]
        }
      });
      return resultados;
    }
    if(tabela == 'modelo'){
      const resultados = await modelos.findAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn('LOWER', sequelize.col('nome')),
              { [Op.like]: `%${str.toLowerCase()}%` }
            ),
            { ativo: true } // Condição para 'ativo' igual a true
          ]
        }
      });
      return resultados;
    }
    if(tabela == 'tipo'){
      const resultados = await tipos.findAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn('LOWER', sequelize.col('nome')),
              { [Op.like]: `%${str.toLowerCase()}%` }
            ),
            { ativo: true } // Condição para 'ativo' igual a true
          ]
        }
      });
      return resultados;
    }
    
  }
}



module.exports = QueryUtils;

        


                   