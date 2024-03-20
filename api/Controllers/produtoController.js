const ProdutoService = require('../Service/produtoService');
const ValidaUpdate = require('../utils/validaUpdate')
const queryUtil = require('../utils/queryUtil')
const Produto = require('../Model/produto');
const ProdutoDao = require('../DAO/produtoDAO');

class ProdutoController {
  static async getAllProdutos(req, res) {
    let {str,ativo,modelo,tamanho,fornecedor,regiao,tipo} = req.query
    if(str != "" && str != null && typeof str != "undefined" ){
       str = str.split("        ")[0]
    }
    if(ativo != "" && ativo != null && typeof ativo != "undefined" ){
      ativo = ativo.split("        ")[0]
    }
   if(modelo != "" && modelo != null && typeof modelo != "undefined" ){
      modelo = modelo.split("        ")[0]
    }
    if(tamanho != "" && tamanho != null && typeof tamanho != "undefined" ){
      tamanho = tamanho.split("        ")[0]
    }
    if(fornecedor != "" && fornecedor != null && typeof fornecedor != "undefined" ){
      fornecedor = fornecedor.split("        ")[0]
    }
    if(regiao != "" && regiao != null && typeof regiao != "undefined" ){
      regiao = regiao.split("        ")[0]
    }
    if(tipo != "" && tipo != null && typeof tipo != "undefined" ){
      tipo = tipo.split("        ")[0]
    }
        

    const filtro = {
      str:str,
      ativo:ativo,
      modelo:modelo,
      tamanho:tamanho,
      fornecedor:fornecedor,
      regiao:regiao,
      tipo:tipo
    }  
    
    const produtos = await ProdutoService.getAllProdutos(filtro);    
    
    res.json({produtos,sucess:true});
  }

  static async getProdutoById(req, res) {
    const { id } = req.params;
    const produto = await ProdutoService.getProdutoById(id);
    if (produto) {
      res.json({produto,sucess:true});
    } else {
      res.status(404).json({ message: 'produto não encontrado' ,sucess:false});
    }
  }

  static async createProduto(req, res) {   
    const produto = req.body;
    try{      
      const produtoCriado = await ProdutoService.createProduto(produto);
      console.log(produtoCriado)
      res.status(201).json({ message:`Produto ${produtoCriado.id} , ${produtoCriado.nome}  criado com sucesso`,sucess:true, produto:produtoCriado});

    }catch(Error){
      console.log(Error)
      res.status(400).json({message:Error.message,sucess:false})
    }    
    
     
    
    
    
  }

static async updateProduto(req, res) {
    const { id } = req.params;
    const produtoUpdate = req.body;
    const produto = await ProdutoService.getProdutoById(id);     
    
    if(produto){
      const newProduto = await ProdutoService.updateProduto(id,produtoUpdate)
      res.status(200).json({message:`Produto ${newProduto.id} - ${newProduto.nome}  Atualizado com sucesso`,sucess:true,produto:newProduto})
    }else{
        res.status(400).json({message:"Produto não encontrado",sucess:false})
    }      
  }   
  

  static async deleteProduto(req, res) {
    const { id } = req.params;
    const message = await ProdutoService.deleteProduto(id);
    res.status(200).json(message);
  }
  static async autoComplete(req,res){    
    const {str} = req.query;    
    const registros = await queryUtil.autoCompleteCampo('produto',str);
    res.json(registros);

  }

  static createCodigo(Produto){

  }
}

module.exports = ProdutoController;