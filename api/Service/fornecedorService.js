const fornecedorDao = require('../DAO/fornecedorDAO');


class FornecedorService {
  static async getAllFornecedores(str,ativo) {
    try{
      const fornecedores = await fornecedorDao.getAll(str,ativo);      
      return fornecedores
    }catch(error){
      return (error);
    }
   
  }

  static async getFornecedorById(id) {
    const fornecedor = await fornecedorDao.getById(id);
    return fornecedor;
  }

  static async createFornecedor(fornecedor) {    
    if(fornecedor.nome == "" || fornecedor.nome == null){
      throw new Error("Nome não pode ser nulo")
    }
    const result = await fornecedorDao.create(fornecedor);       
    return result;
  }

  static async updateFornecedor(id, fornecedor) {    
    const idfornecedorAtualizado = await fornecedorDao.update(id, fornecedor);
    return idfornecedorAtualizado;
  }

  static async deleteFornecedor(id) {
    
    const message = await fornecedorDao.delete(id);
    return message;
  }
  static async nomeFornecedor(nome){
    const fornecedor = await fornecedorDao.nomeFornecedor(nome);
    return fornecedor;
  }

  static async buscaNomeUpdate(idParametro,nome){
    const fornecedor = await fornecedorDao.buscaNomeUpdate(idParametro,nome);
    return fornecedor;
  }
}

module.exports = FornecedorService;