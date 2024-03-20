const {whereClausula} =  require('../utils/utilsDAO');
const Regiao = require('../Model/regiao')
const {Op} = require('sequelize')
const sequelize = require('sequelize')


class RegiaoDao {
 
  static async getAll(filtroString,ativo) {
    if(typeof filtroString == "undefined" &&  typeof ativo == "undefined" ){  
      const resultados = await Regiao.findAll();
      return resultados;
    }
    
    let whereClause = whereClausula(filtroString,ativo)

  
    const resultados = await Regiao.findAll({
      where: whereClause,
    });

    return resultados;
  }

  static async getById(id) {
   const regiao =  Regiao.findByPk(id);
    return regiao;
  }

  static async create(regiao) {
    const regiaoNew =  await Regiao.create({      
      nome:regiao.nome,
      ativo:regiao.ativo
    })
    return regiaoNew;
  }

  static async update(id, regiao) {
    try{
      await Regiao.update(regiao,{
        where:{id:id}
      })
    }catch(error){
      throw error;
    } 
    
  }

  static async nomeRegiao(nome){
    const regiao = await Regiao.findAll({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('nome')),
        { [Op.like]: '%' + nome.toLowerCase() + '%' }
      )
    })
    return regiao;
  }

  static async buscaNomeUpdate(idParametro,nome){
    const regiao = await Regiao.findAll({
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

    return regiao;
  }
  
  

  static async delete(id) {
    await Regiao.destroy({
      where:{id:id}
    });
  }
  

}

module.exports = RegiaoDao;