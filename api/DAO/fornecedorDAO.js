const {whereClausula} =  require('../utils/utilsDAO');
const Fornecedor = require('../Model/fornecedor')
const sequelize = require('sequelize')
const {Op} = require('sequelize')

class FornecedorDao {
 
  static async getAll(filtroString,ativo) {
   
    if(typeof filtroString == "undefined" &&  typeof ativo == "undefined" ){     
      const resultados = await Fornecedor.findAll();
      return resultados;
    }
    let whereClause = whereClausula(filtroString,ativo)

  
    const resultados = await Fornecedor.findAll({
      where: whereClause,
    });

    return resultados;
  }

  static async getById(id) {
   const fornecedor =  Fornecedor.findByPk(id);
    return fornecedor;
  }

  static async  create(fornecedor) {
    const ativo = true
    try{
      const fornecedorNew =  await Fornecedor.create({
        nome:fornecedor.nome,        
        ativo:ativo,
        nomeAnterior:fornecedor.nomeAnterior
      })
      return fornecedorNew;
    }catch(error){
      console.log(error);
    }
   
  }

  static async update(id, fornecedor) {
    await Fornecedor.update(fornecedor,{
      where:{id:id}
    })
  }

  static async nomeFornecedor(nome){
    const fornecedor = await Fornecedor.findAll({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('nome')),
        { [Op.like]: '%' + nome.toLowerCase() + '%' }
      )
    })
    return fornecedor;
  }

  static async buscaNomeUpdate(idParametro,nome){
    const fornecedor = await Fornecedor.findAll({
      where: {
        [Op.and]: [
          sequelize.where(
            sequelize.fn('LOWER', sequelize.col('nome')),
            { [Op.like]: '%' + nome.toLowerCase() + '%' }
          ),
          { id: { [Op.ne]: idParametro } }
        ]
      }
    });

    return fornecedor;
  }
  
  

  static async delete(id) {
    await Fornecedor.destroy({
      where:{id:id}
    });
  }
  

}

module.exports = FornecedorDao;