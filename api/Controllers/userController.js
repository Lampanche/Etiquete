const userService = require('../Service/UserService');
const ValidaUpdate = require('../utils/validaUpdate')
const queryUtil = require('../utils/queryUtil')

class UserController {
  static async getAllUsers(req, res) {
    const {str,ativo} = req.query   
    const users = await userService.getAllUser(str,ativo);    
    
      res.json({users,sucess:true});
    
    
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    
    const user = await userService.getUserById(id);
    if (user) {
      res.json({user,sucess:true});
    } else {
      res.status(404).json({ message: 'user não encontrado' ,sucess:false});
    }
  }

  static async createUser(req, res) {
   
    const { login,senha } = req.body;
    const userJacriado = await userService.getAllUser();
    if(userJacriado.length >= 1){
       return res.status(400).json({message:"ja possui um usuario cadastrado",sucess:false})
    }
    if(typeof login == "undefined" || login == "" || login == null || typeof senha == "undefined" || senha == "" || senha == null ){
      return res.status(400).json({message:"login ou senha invalidos",sucess:false})
    }
     
    try{
        const user = await userService.createUser({ login,senha});    
        res.status(201).json({ message:`user ${user.login} criado com sucesso`,sucess:true});
    }catch(error){
        res.status(400).json({message:error.message,sucess:false})
    } 
    
  }

static async updateUser(req, res) {
    const { id } = req.params;
    const { senha,login } = req.body;
    const user = await userService.getUserById(id);  
   
    
    if(user){
      
    
      try{
        userService.updateUser(id,{senha,login})
        res.status(200).json({message:`user ${id} - ${login} Atualizado com sucesso`,sucess:true})
      }catch(error){
        res.status(400).json({message:`Erro ao criar user - tente novamente`,sucess:false})
      }
    }else{       
        res.status(400).json({message:"user selecionado não encontrado",sucess:false})
    }
      
    }   
  

  static async deleteUser(req, res) {
    const { id } = req.params;
    const message = await userService.deleteUser(id);
    res.status(200).json(message);
  }

  static async autoComplete(req,res){    
    const {str} = req.query;
    
    const registros = await queryUtil.autoCompleteCampo('user',str);
    res.json(registros);

  }
}

module.exports = UserController;