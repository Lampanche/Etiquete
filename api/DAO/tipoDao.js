const {whereClausula} =  require('../utils/utilsDAO');
const Tipo = require('../Model/tipo')
const {Op} = require('sequelize')
const sequelize = require('sequelize')


class TipoDao {
 
  static async getAll(filtroString,ativo) {
    
    if(typeof filtroString == "undefined" &&  typeof ativo == "undefined" ){   
         
      const resultados = await Tipo.findAll();
      return resultados;
    }
    
   const whereClause = whereClausula(filtroString,ativo);

    

  
  const resultados = await Tipo.findAll({
    where: whereClause,
  });

  return resultados;
  }

  static async getById(id) {
   const tipo =  Tipo.findByPk(id);
    return tipo;
  }

  static async create(tipo) {
    const tipoNew =  await Tipo.create({
      nome:tipo.nome,     
      ativo:tipo.ativo,
      nomeAnterior:tipo.nomeAnterior
    })
    return tipoNew;
  }

  static async update(id, tipo) {
    await Tipo.update(tipo,{
      where:{id:id}
    })
  }

  static async nomeTipo(nome){
    const tipo = await Tipo.findAll({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('nome')),
        { [Op.like]: '%' + nome.toLowerCase() + '%' }
      )
    })
    return tipo;
  }

  static async buscaNomeUpdate(idParametro,nome){
    const tipo = await Tipo.findAll({
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

    return tipo;
  }
  

  static async delete(id) {
    await Tipo.destroy({
      where:{id:id}
    });
  }
  

}

module.exports = TipoDao;