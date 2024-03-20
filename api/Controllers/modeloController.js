const ModeloService = require('../Service/ModeloService');
const ValidaUpdate = require('../utils/validaUpdate')
const queryUtil = require('../utils/queryUtil')

class ModeloController {
  static async getAllModelos(req, res) {
    const {str,ativo} = req.query    
    const modelos = await ModeloService.getAllModelos(str,ativo);    
   
   return  res.json({modelos,sucess:true});
  }

  static async getModeloById(req, res) {
    const { id } = req.params;
    const modelo = await ModeloService.getModeloById(id);
    if (modelo) {
     return res.json({modelo,sucess:true});
    } else {
    return  res.status(404).json({ message: 'Modelo não encontrado' ,sucess:false});
    }
  }

  static async createModelo(req, res) {   
        const { nome } = req.body;
        const modeloNome = await ModeloService.nomeModelo(nome);
        if(modeloNome != null && modeloNome.length > 0){
         return res.status(400).json({ message:`ja existe modelo cadastrado com esse nome`,sucess:false}); 
        }else{
          const ativo =true;  
          try{
            const nomeAnterior = nome;
            const modeloCriado = await ModeloService.createModelo({ nome,ativo,nomeAnterior });    
          return  res.status(201).json({ message:`Modelo ${modeloCriado.nome} criado com sucesso`,sucess:true}); 
  
          }catch(error){
           return res.status(400).json({ message:error.message,sucess:false}); 
          }         

        }
    
  }

static async updateModelo(req, res) {
    const { id } = req.params;
    const { nome,ativo } = req.body;
    const modelo = await ModeloService.getModeloById(id);
    const nomeAnterior = modelo.nome;  
     
    
    if(modelo){
     
      
    try{
      const modeloExiste = await ModeloService.buscaNomeUpdate(id,nome);
        if(modeloExiste != null && modeloExiste.length >0){
           return res.status(400).json({message:"Nome ja cadastrado em outro Modelo",sucesso:true})
        }else{
          ModeloService.updateModelo(id,{nome,ativo,nomeAnterior})
         return  res.status(200).json({message:`Modelo ${id} - ${nome} Atualizado com sucesso`,sucess:true})
        }
      

    }catch(error){
     return res.status(400).json({message:"Houve um erro ao cadastrar o Modelo, tente novamente"})
    }
     
        
     
    }else{
       
      return  res.status(400).json({message:"Modelo não encontrado",sucess:false})
    }
      
    }   
  

  static async deleteModelo(req, res) {
    const { id } = req.params;
    const message = await ModeloService.deleteModelo(id);
    return res.status(200).json(message);
  }
  static async autoComplete(req,res){    
    const {str} = req.query;
    
    const registros = await queryUtil.autoCompleteCampo('modelo',str);
    return  res.json(registros);

  }
}

module.exports = ModeloController;