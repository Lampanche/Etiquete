const regiaoService = require('../Service/regiaoService');
const ValidaUpdate = require('../utils/validaUpdate')
const queryUtil = require('../utils/queryUtil')

class RegiaoController {
  static async getAllRegioes(req, res) {
    const {str,ativo} = req.query   
    const regioes = await regiaoService.getAllRegioes(str,ativo);   
  
    res.json({regioes,sucess:true});
  }

  static async getRegiaoById(req, res) {
    const { id } = req.params;
    const regiao = await regiaoService.getRegiaoById(id);
    if (regiao) {
      res.json({regiao,sucess:true});
    } else {
      res.status(404).json({ message: 'Regiao não encontrado' ,sucess:false});
    }
  }

  static async createRegiao(req, res) {
   
    const { nome } = req.body;
    const ativo = true;
    const regiaoNome = await regiaoService.nomeRegiao(nome);
        if(regiaoNome != null && regiaoNome.length >0 ){
         return res.status(400).json({ message:`já existe região cadastrado com esse nome`,sucess:false}); 
        }else{
          try{
            const regiao = await regiaoService.createRegiao({ nome,ativo });    
            res.status(201).json({ message:`Regiao ${regiao.nome} criado com sucesso`,sucess:true});
          }catch(error){
              res.status(400).json({message:error.message,sucess:false})
          } 
        }
   
      
   
    
  }

static async updateRegiao(req, res) {
    const { id } = req.params;
    const { nome,ativo } = req.body;
    const regiao = await regiaoService.getRegiaoById(id);  
    
    
    if(regiao){     
      try{
        const regiaoNome = await regiaoService.buscaNomeUpdate(id, nome);
        if(regiaoNome != null && regiaoNome.length >0 ){
          return res.status(400).json({message:"Nome já cadastrado em outra região",sucess:false})
        }
        regiaoService.updateRegiao(id,{nome,ativo})
        res.status(200).json({message:`Regiao ${id} - ${nome} Atualizado com sucesso`,sucess:true})
      }catch(error){
        res.status(400).json({message:`Erro ao cadastrar região , tente novamente`,sucess:false})
      }
    }else{       
        res.status(400).json({message:"Regiao não encontrada",sucess:false})
    }
      
    }   
  

  static async deleteRegiao(req, res) {
    const { id } = req.params;
    const message = await regiaoService.deleteRegiao(id);
    res.status(200).json(message);
  }
  static async autoComplete(req,res){    
    const {str} = req.query;
    
    const registros = await queryUtil.autoCompleteCampo('regiao',str);
    res.json(registros);

  }
  
}

module.exports = RegiaoController;