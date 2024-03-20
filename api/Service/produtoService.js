const ProdutoDao = require('../DAO/produtoDAO');

const JsBarcode = require('jsbarcode');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const bwipjs = require('bwip-js');
const Produto = require("../Model/produto")

class ProdutoService {
  static async getAllProdutos(filtro) {
    try{
      const produtos = await ProdutoDao.getAll(filtro);     
      return produtos
    }catch(error){
      return (error);
    }   
  }

  static async getProdutoById(id) {
    const produto = await ProdutoDao.getById(id);
    return produto;
  }

  static async createProduto(produto) {     
      if(produto.tamanhoId == null || produto.tamanhoId == "" ){
        throw new Error("Não foi possivel criar o produto tamanho não selecionado");
      }
      if(produto.modeloId == null || produto.modeloId == "" ){
        throw new Error("Não foi possivel criar o produto, modelo não selecionado");
      }
      if(produto.fornecedorId == null || produto.fornecedorId == ""){
         throw new Error("Não foi possivel criar o produto, fornecedor não selecionado")
      }
      if(produto.tipoId == null || produto.tipoId == ""){
         throw new Error("Não foi possivel criar o produto, tipo não selecionado")
      }
      if(produto.regiaoId == null || produto.regiaoId == ""){
         throw new Error("Não foi possivel criar o produto, regiao não selecionada")
      }
      if(produto.precoVenda == null || produto.precoVenda == "" ){
         throw new Error("Não foi possivel criar o produto, preço de venda não informado caso não houver prencha com 0000 para sair no codigos de barras")
      }
      if(produto.precoCusto == null || produto.precoCusto == ""){
         throw new Error("Não foi possivel criar o produto, preço de venda não informado caso não houver prencha com 000 para sair no codigos de barras")
      }
      if(produto.ano == null || produto.ano == "" ){
         throw new Error("Não foi possivel criar o produto, ano não selecionado")
      }
      if(produto.nome == null || produto.nome == ""){
         throw new Error("Não foi possivel criar o produto, nome não informado")
      }
      
      try{
        produto.codigo = this.createCodigo(produto); 
        produto.codigoAnterior = produto.codigo 
        produto.nomeAnterior = produto.nome;
        const result = await ProdutoDao.create(produto); 
       
       
      
      return result     
      }catch(Error){
        console.log("AQUICATCH")
        return Error.message
      }
      
         
    
  }

  
 static async updateProdutoCodigo(id,produto){
  const newProduto = await ProdutoDao.update(id, produto);
  return newProduto;
 }
  static async updateProduto(id, produto) {
    const produtoAntigo = await ProdutoDao.getById(id);
    produto.id = id;
    produto.codigoAnterior =  produtoAntigo.codigo;
    produto.nomeAnterior = produtoAntigo.nome;
    produto.codigo = this.createCodigo(produto);   
      
    const newProduto = await ProdutoDao.update(id, produto);
    const produtoAtualizado = await this.getProdutoById(id);
  
    
    return produtoAtualizado;
  }

  static async deleteProduto(id) {
    
    const message = await ProdutoDao.delete(id);
    return message;
  }
  static async codigoProduto(codigo){
    
    const produto = await ProdutoDao.codigoProduto(codigo);
    return produto;
  }     
  

  static modelaInfoforcodigoBar(numberString,minLength){
    let numberStringFormatada = ""    
    let zerosToAdd = minLength - numberString.length;
    let codigo ="";
    if(zerosToAdd > 0){
      for (let i = 0; i < zerosToAdd; i++) {
        numberStringFormatada += '0';
      }    
    }
    codigo = numberStringFormatada + numberString;
       
    return codigo;
  }

  static createCodigo(Produto){
   let ano = "";
   let comNota = "";
   let regiao =""
   let fornecedor =""
   let tipo = ""
   let modelo =""
   let tamanho =""
   let precoCusto = ""
   let precoVenda = ""
   let codigo = "";
   
   
    for(let prop in Produto){
      
      
      if(prop == "comNota"){
        if(Produto[prop] == true || Produto[prop] == "true" ){
          comNota = "1"
        }else{
          comNota = "0"
        }        
      }
      if(prop == "ano"){
        
        const valor = Produto[prop]
        ano += this.modelaInfoforcodigoBar(valor.toString(),2);
      }
      if(prop == "regiaoId"){
        const valor = Produto[prop]
        if(valor > 9){
          regiao += this.modelaInfoforcodigoBar(valor.toString(),2)
        }else{
          regiao += this.modelaInfoforcodigoBar(valor.toString(),1)
        }       
      }
      if(prop == "fornecedorId"){
       
        const valor = Produto[prop]
        fornecedor += this.modelaInfoforcodigoBar(valor.toString(),3)
      }
      if(prop == "tipoId"){
       
        const valor = Produto[prop]
        tipo += this.modelaInfoforcodigoBar(valor.toString(),2)
      }
      if(prop == "modeloId"){
        
        const valor = Produto[prop]
        modelo += this.modelaInfoforcodigoBar(valor.toString(),2)
      }
      if(prop == "tamanhoId"){
       
        const valor = Produto[prop]
        tamanho += this.modelaInfoforcodigoBar(valor.toString(),2)
      }
      if(prop == "precoVenda"){
       
        const valor = Produto[prop]
        precoVenda += this.modelaInfoforcodigoBar(valor.toString().replace(",","").replace(".",""),4)
      }
      if(prop == "precoCusto"){
       
        const valor = Produto[prop]
        precoCusto += this.modelaInfoforcodigoBar(valor.toString().replace(",","").replace(".",""),3)
      }  
      
        
      
        
      
    }
    
    codigo += comNota;
    codigo += ano;    
    codigo += regiao;
    codigo += fornecedor;
    codigo += tipo;
    codigo += modelo;
    codigo += tamanho;
    codigo += precoCusto;   
    codigo += precoVenda;   
    console.log(codigo,"[CODIGO AQUI DENTRO]") 
    
    return codigo;
    
    
  }    


    

}




module.exports = ProdutoService;