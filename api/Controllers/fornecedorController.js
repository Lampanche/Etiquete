const fornecedorService = require('../Service/fornecedorService');
const ValidaUpdate = require('../utils/validaUpdate')
const queryUtil = require('../utils/queryUtil')

class FornecedorController {
  static async getAllFornecedores(req, res) {
    const {str,ativo} = req.query    
    const fornecedores = await fornecedorService.getAllFornecedores(str,ativo);    
    console.log("forencedores:",fornecedores);
   return res.status(200).json({fornecedores,sucess:true});
  }

  static async getFornecedorById(req, res) {
    const { id } = req.params;
    const fornecedor = await fornecedorService.getFornecedorById(id);
    if (fornecedor) {
      res.json({fornecedor,sucess:true});
    } else {
     return res.status(404).json({ message: 'Fornecedor não encontrado' ,sucess:false});
    }
  }

  static async createFornecedor(req, res) {
   
    const { nome } = req.body;
    const ativo = true

    const fornecedorNome = await fornecedorService.nomeFornecedor(nome);
    if(fornecedorNome != null && fornecedorNome.length > 0){
     return res.status(400).json({message:"ja existe fornecedor cadastrado com esse nome",sucess:false})
    }else{
      try{
        const fornecedor = await fornecedorService.createFornecedor({ nome,ativo });
        fornecedor.nomeAnterior = nome;    
       return res.status(201).json({ message:`Fornecedor ${fornecedor.nome} criado com sucesso`,sucess:true});
    }catch(error){
       return res.status(400).json({message:error.message,sucess:false})
    }

  }
   
   
     
    
  }

static async updateFornecedor(req, res) {
    const { id } = req.params;
    const { nome,ativo } = req.body;
    const fornecedor = await fornecedorService.getFornecedorById(id);
    const nomeAnterior = fornecedor.nome;   
    
    if(fornecedor){
      try{
        const fornecedorExiste = await fornecedorService.buscaNomeUpdate(id,nome);
        if(fornecedorExiste != null &&  fornecedorExiste.length > 0){
          return  res.status(400).json({message:"Nome ja cadastrado em outro Fornecedor",sucesso:true})
        }
       
      }catch(error){
       return res.status(400).json({message:"Ocorreu um erro ao busca informações do Tipo, tente novamente",sucess:false})
      }  
      try{
        fornecedorService.updateFornecedor(id,{nome,ativo,nomeAnterior})
       return res.status(200).json({message:`Fornecedor ${id} - ${nome} Atualizado com sucesso`,sucess:true})

      }catch(Error){
       return res.status(404).json({message:"Erro ao atualizar fornecedor",erroInterno:Error.message,sucess:true})
      }
      
        
      
    }else{       
       return res.status(400).json({message:"Fornecedor não encontrado",sucess:false})
    }
      
}   
  

  static async deleteFornecedor(req, res) {
    const { id } = req.params;
    const message = await fornecedorService.deleteFornecedor(id);
   return res.status(200).json(message);
  }
  static async autoComplete(req,res){    
    const {str} = req.query;
    
    const registros = await queryUtil.autoCompleteCampo('fornecedor',str);
   return res.json(registros);

  }
}

module.exports = FornecedorController;