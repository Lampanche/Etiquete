const UserDAO = require('../DAO/UserDAO');

class userService {
  static async getAllUser(str,ativo) {
    try{
      const users = await UserDAO.getAll(str,ativo);    
      return users
    }catch(error){
      return (error);
    }
   
  }

  static async getUserById(id) {
    const user = await UserDAO.getById(id);
    return user;
  }

  static async createUser(user) { 
    if(user.login== null || user.senha == ""){
      throw new Error("Login e Senha não pode ser nulo")
    }   
    const result = await UserDAO.create(user);       
    return result;
  }

  static async updateUser(id, user) {    
    const iduserAtualizado = await UserDAO.update(id, user);
    return iduserAtualizado;
  }

  static async deleteUser(id) {
    
    const message = await UserDAO.delete(id);
    return message;
  }
  static async codigoUser(codigo){
    const user = await UserDAO.codigouser(codigo);
    return user;
  }
}

module.exports = userService;