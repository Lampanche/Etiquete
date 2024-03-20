const TipoDao = require('../DAO/tipoDao');

class TipoService {
  static async getAllTipos(str,ativo) {
    try{
      const tipos = await TipoDao.getAll(str,ativo);
      console.log("TESTE",tipos);
      return tipos
    }catch(error){
      return (error);
    }
   
  }

  static async getTipoById(id) {
    const tipo = await TipoDao.getById(id);
    return tipo;
  }

  static async createTipo(tipo) { 
    if(tipo.nome== null || tipo.nome == ""){
      throw new Error("Nome não pode ser nulo")
    }   
    const result = await TipoDao.create(tipo);       
    return result;
  }

  static async updateTipo(id, tipo) {    
    const idtipoAtualizado = await TipoDao.update(id, tipo);
    return idtipoAtualizado;
  }

  static async deleteTipo(id) {
    
    const message = await TipoDao.delete(id);
    return message;
  }
  static async nomeTipo(nome){
    const tipo = await TipoDao.nomeTipo(nome);
    return tipo;
  }

  static async buscaNomeUpdate(idParametro,nome){
     const tipo = await TipoDao.buscaNomeUpdate(idParametro,nome);
     return tipo;
  }
  
}


module.exports = TipoService;