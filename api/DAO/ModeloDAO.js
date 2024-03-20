const {whereClausula} =  require('../utils/utilsDAO');
const Modelo = require('../Model/modelo')
const {Op} = require('sequelize')
const sequelize = require('sequelize')



class ModeloDao {
 
  static async getAll(filtroString,ativo) {
    if(typeof filtroString == "undefined" &&  typeof ativo == "undefined" ){     
      const resultados = await Modelo.findAll();
      return resultados;
    }
    let whereClause = whereClausula(filtroString,ativo)

  
    const resultados = await Modelo.findAll({
      where: whereClause,
    });

    return resultados;
  }

  static async getById(id) {
   const modelo =  Modelo.findByPk(id);
    return modelo;
  }

  static async create(modelo) {
    const modeloNew =  await Modelo.create({      
      nome:modelo.nome,
      ativo:modelo.ativo,
      nomeAnterior:modelo.nomeAnterior
    })
    return modeloNew;
  }

  static async update(id, modelo) {
    await Modelo.update(modelo,{
      where:{id:id}
    })
  }

  static async nomeModelo(nome){
    const modelo = await Modelo.findAll({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('nome')),
        { [Op.like]: '%' + nome.toLowerCase() + '%' }
      )
    })
    return modelo;
  }

  static async buscaNomeUpdate(idParametro,nome){
    const modelo = await Modelo.findAll({
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

    return modelo;
  }
  

  static async delete(id) {
    await Modelo.destroy({
      where:{id:id}
    });
  }
  

}

module.exports = ModeloDao;