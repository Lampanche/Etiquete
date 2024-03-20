const {whereClausula} =  require('../utils/utilsDAO');
const User = require('../Model/user')
const {Op} = require('sequelize')
const sequelize = require('sequelize')


class UserDAO {
 
  static async getAll(filtroString,ativo) {
    
    if(typeof filtroString == "undefined" &&  typeof ativo == "undefined" ){   
         
      const resultados = await User.findAll();
      return resultados;
    }
    
   const whereClause = whereClausula(filtroString,ativo);

    

  
  const resultados = await User.findAll({
    where: whereClause,
  });

  return resultados;
  }

  static async getById(id) {
   const user =  User.findByPk(id);
    return user;
  }

  static async create(user) {
    const userNew =  await User.create({
      login:user.login,     
      senha:user.senha
    })
    return userNew;
  }

  static async update(id, user) {
    await User.update(user,{
      where:{id:id}
    })
  }

  static async codigoUser(codigo){
    const user = await User.findOne({
      where:{
        codigo:codigo
      }
    })
    return user;
  }
  

  static async delete(id) {
    await User.destroy({
      where:{id:id}
    });
  }
  

}

module.exports = UserDAO;