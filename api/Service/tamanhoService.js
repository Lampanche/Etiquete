const TamanhoDao = require('../DAO/tamanhoDAO');
const TamanhoModel = require('../Model/tamanho');

class TamanhoService {
  static async getAllTamanhos(str,ativo) {
    try{
      const tamanhos = await TamanhoDao.getAll(str,ativo);
     
      return tamanhos
    }catch(error){
      return (error);
    }
   
  }

  static async getTamanhoById(id) {
    const tamanho = await TamanhoDao.getById(id);
    return tamanho;
  }

  static async createTamanho({nome,ativo}) {
    if(nome == null || nome == ""){
      throw new Error("Nome não pode ser vazio")
    }
    const result = await TamanhoDao.create({nome,ativo});
    return result;
  }

  static async updateTamanho(id, tamanho) {    
    const idTamanhoAtualizado = await TamanhoDao.update(id, tamanho);
    return idTamanhoAtualizado;
  }

  static async deleteTamanho(id) {
    const message = await TamanhoDao.delete(id);
    return message;
  }
  static async nomeTamanho(nome){
    const tamanho = await TamanhoDao.nomeTamanho(nome);
    return tamanho
  }
  static async buscaNomeUpdate(idParametro,nome){
    const tamanho = await TamanhoDao.buscaNomeUpdate(idParametro,nome);
    return tamanho;
  }
}

module.exports = TamanhoService;