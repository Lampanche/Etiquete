const RegiaoDao = require('../DAO/regiaoDAO');


class regiaoService {
  static async getAllRegioes(str,ativo) {
    try{
      const regioes = await RegiaoDao.getAll(str,ativo);      
      return regioes
    }catch(error){
      return (error);
    }   
  } 

  static async getRegiaoById(id) {
    const regiao = await RegiaoDao.getById(id);
    return regiao;
  }

  static async createRegiao(regiao) {    
    if(regiao.nome == null || regiao.nome == ""){
      throw new Error("Nome não pode ser vazio")
    }
    const result = await RegiaoDao.create(regiao);       
    return result;
  }

  static async updateRegiao(id, regiao) {    
    const idregiaoAtualizado = await RegiaoDao.update(id, regiao);
    return idregiaoAtualizado;
  }

  static async deleteRegiao(id) {    
    const message = await RegiaoDao.delete(id);
    return message;
  }
  static async nomeRegiao(nome){
    const regiao = await RegiaoDao.nomeRegiao(nome);
    return regiao;
  }
  static async buscaNomeUpdate(idParametro,nome){
    const regiao = await RegiaoDao.buscaNomeUpdate(idParametro,nome);
    return regiao;
  }
}

module.exports = regiaoService;