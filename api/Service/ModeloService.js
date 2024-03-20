const ModeloDao = require('../DAO/ModeloDAO');


class ModeloService {
  static async getAllModelos(str,ativo) {
    try{
      const modelos = await ModeloDao.getAll(str,ativo);     
      return modelos
    }catch(error){
      return (error);
    }
   
  }

  static async getModeloById(id) {
    const modelo = await ModeloDao.getById(id);
    return modelo;
  }

  static async createModelo(modelo) {   
    if(modelo.nome == "" || modelo.nome == null){
      throw new Error("Nome não pode ser nulo")
    } 
    const result = await ModeloDao.create(modelo);       
    return result;
  }

  static async updateModelo(id, modelo) {    
    const idModeloAtualizado = await ModeloDao.update(id, modelo);
    return idModeloAtualizado;
  }

  static async deleteModelo(id) {
    
    const message = await ModeloDao.delete(id);
    return message;
  }
  static async nomeModelo(nome){
    const modelo = await ModeloDao.nomeModelo(nome);
    return modelo;
  }

  static async buscaNomeUpdate(id,nome){
    const modelo = await ModeloDao.buscaNomeUpdate(id,nome);
    return modelo;
  }
}

module.exports = ModeloService;