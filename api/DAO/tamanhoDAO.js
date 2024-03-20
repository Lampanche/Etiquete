const {whereClausula} =  require('../utils/utilsDAO');
const Tamanho = require('../Model/tamanho')
const sequelize = require('sequelize')
const {Op} = require('sequelize')

class TamanhoDao {
 
  static async getAll(filtroString,ativo) {
    if(typeof filtroString == "undefined" &&  typeof ativo == "undefined" ){
      const resultados = await Tamanho.findAll();
      return resultados;
    }

    let whereClause = whereClausula(filtroString,ativo)


  
    const resultados = await Tamanho.findAll({
      where: whereClause,
    });

    return resultados;
  }

  static async getById(id) {
   const tamanho =  Tamanho.findByPk(id);
    return tamanho;
  }

  static async create({nome}) {
    const ativo =true;
    const tamanhoNew =  await Tamanho.create({
      nome:nome,      
      ativo:ativo
    })
    return tamanhoNew;
  }

  static async update(id, tamanho) {
    await Tamanho.update(tamanho,{
      where:{id:id}
    })
  }

  static async nomeTamanho(nome){
    const tamanho = await Tamanho.findAll({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('nome')),
        { [Op.like]: '%' + nome.toLowerCase() + '%' }
      )
    })
    return tamanho;
  }

  static async buscaNomeUpdate(idParametro,nome){
    const tamanho = await Tamanho.findAll({
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

    return tamanho;
  }
  

  static async delete(id) {
    await Tamanho.destroy({
      where:{id:id}
    });
  }
  

}

module.exports = TamanhoDao;