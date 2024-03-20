const tipoService = require('../Service/tipoService');
const ValidaUpdate = require('../utils/validaUpdate')
const queryUtil = require('../utils/queryUtil')

class TipoController {
  static async getAllTipos(req, res) {
    const {str,ativo} = req.query   
    const tipos = await tipoService.getAllTipos(str,ativo);    
    
      res.json({tipos,sucess:true});
    
    
  }

  static async getTipoById(req, res) {
    const { id } = req.params;
    
    const tipo = await tipoService.getTipoById(id);
    if (tipo) {
      res.json({tipo,sucess:true});
    } else {
      res.status(404).json({ message: 'tipo não encontrado' ,sucess:false});
    }
  }

  static async createTipo(req, res) {
   
    const { nome } = req.body;
    const tipoNome = await tipoService.nomeTipo(nome);
    console.log(tipoNome,"TIPO")
        if(tipoNome != null && tipoNome.length > 0){
          return res.status(400).json({ message:`já existe tipo cadastrado com esse nome`,sucess:false}); 
        }else{
          const ativo = true;    
          try{
              const nomeAnterior = nome;
              const tipo = await tipoService.createTipo({ nome,ativo,nomeAnterior});    
            return  res.status(201).json({ message:`Tipo ${tipo.nome} criado com sucesso`,sucess:true});
          }catch(error){
             return res.status(400).json({message:error.message,sucess:false})
          } 

        }
    
    
  }

static async updateTipo(req, res) {
    const { id } = req.params;
    const { nome,ativo } = req.body;
    const tipo = await tipoService.getTipoById(id);  
    const nomeAnterior = tipo.nome;
    
    
    if(tipo){
      try{
        const tipoExiste = await tipoService.buscaNomeUpdate(id,nome);
        
        if(tipoExiste.length > 0 && tipoExiste != null ){
          return  res.status(400).json({message:`Nome ja cadastrado em outro Tipo,${tipoExiste}`,sucesso:true})
        }else{
          tipoService.updateTipo(id,{nome,ativo,nomeAnterior})
          return  res.status(200).json({message:`Tipo ${id} - ${nome} Atualizado com sucesso`,sucess:true})
        }       
       
      }catch(error){
        return res.status(400).json({message:`Erro ai criar tipo - tente novamente`,sucess:false})
      }
    }else{       
       return res.status(400).json({message:"Tipo selecionado não encontrado",sucess:false})
    }
      
    }   
  

  static async deleteTipo(req, res) {
    const { id } = req.params;
    const message = await tipoService.deleteTipo(id);
    res.status(200).json(message);
  }

  static async autoComplete(req,res){    
    const {str} = req.query;
    
    const registros = await queryUtil.autoCompleteCampo('tipo',str);
    res.json(registros);

  }
}

module.exports = TipoController;