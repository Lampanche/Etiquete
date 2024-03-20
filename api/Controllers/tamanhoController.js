
const queryUtil = require('../utils/queryUtil');
const TamanhoService = require('../Service/tamanhoService');
const  validaUpdate = require('../utils/validaUpdate');


class TamanhoController {
  static async getAllTamanhos(req, res) {
    const {str,ativo} = req.query
    
    const tamanhos = await TamanhoService.getAllTamanhos(str,ativo);  
    
    res.json({tamanhos,sucess:true});
  }

  static async getTamanhoById(req, res) {
    const { id } = req.params;
    const tamanho = await TamanhoService.getTamanhoById(id);
    if (tamanho) {
      res.json({tamanho,sucess:false});
    } else {
      res.status(404).json({ message: 'Tamanho não encontrado',sucess:false });
    }
  }

  static async createTamanho(req, res) {
    const { nome } = req.body;
    const tamanhoNome = await TamanhoService.nomeTamanho(nome);
        if(tamanhoNome != null && tamanhoNome.length > 0){
          res.status(400).json({ message:`já existe tamanho cadastrado com esse nome`,sucess:false}); 
        }else{
          const ativo = true;
        
          try{
            const tamanho = await TamanhoService.createTamanho({ nome,ativo});
            res.status(201).json({ message:`Tamanho ${tamanho.nome} criado com sucesso`,sucess:true});
          }catch(error){
            res.status(400).json({message:error.message,sucess:false})
          }
       }
    
   
    
  }

  static async updateTamanho(req, res) {
    const { id } = req.params;
    const tamanho = req.body;
    const tamanhoUpdate = await TamanhoService.getTamanhoById(id); 


    if(tamanhoUpdate){        
      try{
        const tamanhoNome = await TamanhoService.buscaNomeUpdate(id,tamanho.nome);
        if(tamanhoNome.length > 0 && tamanhoNome != null){
          return res.status(400).json({message:"Nome já cadastrado em outro tamanho"})
        }
        TamanhoService.updateTamanho(id,tamanho);
        res.status(200).json({message:`Tamanho ${tamanhoUpdate.id}  Atualizado com sucesso`,sucess:true})
      }catch(Error){
        res.status(400).json({message:`Erro ao atualizar tamanho - tente novamente `,sucess:false})
      }
      }else{       
        res.status(400).json({message:"Modelo não encontrado",sucess:false})
      }
    }
  

  static async deleteTamanho(req, res) {
    const { id } = req.params;
    const tamanho = await TamanhoService.getTamanhoById(id); 
    if(tamanho){
      const message = await TamanhoService.deleteTamanho(id);
      res.status(200).json(message);
    }else{
      res.status(400).json({message:"Tamanho não encontrado",sucess:false})
    }
    
  }
  static async autoComplete(req,res){    
    const {str} = req.query;
    
    const registros = await queryUtil.autoCompleteCampo('tamanho',str);
    res.json(registros);

  }
}

module.exports = TamanhoController;