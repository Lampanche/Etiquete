const Produto = require('../Model/produto');
const Sequelize = require('sequelize');
const Tamanho = require('../Model/tamanho');
const Modelo = require('../Model/modelo');
const Regiao = require('../Model/regiao');
const Tipo = require('../Model/tipo');
const Fornecedor = require('../Model/fornecedor');

const {Op} = require('sequelize');
const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelize/index');


class ProdutoDao{
  static async getAll(filtro) {    
    
 
  
    let query1 = `SELECT p.* FROM produtos p LEFT OUTER JOIN tamanhos t on t.id = p.tamanhoid LEFT OUTER JOIN modelos m on m.id = p.modeloid LEFT OUTER JOIN fornecedors f on f.id = p.fornecedorid LEFT OUTER  JOIN tipos ti on ti.id = p.tipoid LEFT OUTER JOIN regiaos r on r.id = p.regiaoid WHERE 1=1 `;
    if(typeof filtro.str != "undefined" && filtro.str != null && filtro.str != ""){
      query1 += ` AND LOWER(p.nome) LIKE LOWER('%${filtro.str}%')`  
    }
    if(typeof filtro.modelo != "undefined" && filtro.modelo != null && filtro.modelo != ""){
      query1 += ` AND LOWER(m.nome) LIKE LOWER('%${filtro.modelo}%')`  
    }
    if(typeof filtro.fornecedor != "undefined" && filtro.fornecedor != null && filtro.fornecedor != ""){
      query1 += ` AND LOWER(f.nome) LIKE LOWER('%${filtro.fornecedor}%')`  
    }
    if(typeof filtro.tipo != "undefined" && filtro.tipo != null && filtro.tipo != ""){
      query1 += ` AND LOWER(ti.nome) LIKE LOWER('%${filtro.tipo}%') ` 
    }
    if(typeof filtro.regiao != "undefined" && filtro.regiao != null && filtro.regiao != ""){
      query1 += ` AND LOWER(r.nome) LIKE LOWER('%${filtro.regiao}%')`  
    }
    if(typeof filtro.tamanho != "undefined" && filtro.tamanho != null && filtro.tamanho != ""){
      query1 += ` AND LOWER(t.nome) LIKE LOWER('%${filtro.tamanho}%')`  
    }
    if(typeof filtro.ativo != "undefined" && filtro.ativo != null && filtro.ativo != ""){
      if(filtro.ativo == 'true'){
        query1 += ` AND p.ativo = ${true}`  
      }
      if(filtro.ativo == 'false'){
        query1 += ` AND p.ativo = ${false}`  
      }
      
    }
    
    try{
      const results = await sequelize.query(query1,{ type: QueryTypes.SELECT }) ;
      return results
    }catch(error){
      console.log(error)
    }


}


  
  
static async getById(id) {
   const produto = await Produto.findByPk(id,{include:[Tamanho,Modelo,Tipo,Regiao,Fornecedor]});
   
    return produto;
  }

  static async getByProdutoId(id) {
    const produto = await Produto.findByPk(id);
    
     return produto;
   }
  
  static async create(produto) {
    
    try{
      const produtoNew =  await Produto.create({   
          
        nome:produto.nome,  
        ativo:true,
        ano:produto.ano,
        comNota:produto.comNota,
        tamanhoId:produto.tamanhoId,
        modeloId:produto.modeloId,
        fornecedorId:produto.fornecedorId,
        tipoId:produto.tipoId, 
        regiaoId:produto.regiaoId,
        descricao:produto.descricao,
        estoque:produto.estoque,
        precoVenda:produto.precoVenda,
        precoCusto:produto.precoCusto,
        codigo:produto.codigo,
        codigoAnterior:produto.codigoAnterior,
        nomeAnterior:produto.nomeAnterior
      })

      
      return produtoNew;

    }catch(Error){return Error.message}

    
  }
  
  static async update(id, produto) {
    const newProduto = await Produto.update(produto,{
      where:{id:id}
    })
    return newProduto
  }
  
  static async codigoProduto(codigo){
    try{
      const produto = await Produto.findOne({
        where:{
          codigo:codigo
        }
      })
      
      return produto;

    }catch(error){
      console.log(error)
    }
    
  }
  
  
  static async delete(id) {
    await Produto.destroy({
      where:{id:id}
    });
  }

}

module.exports = ProdutoDao;
