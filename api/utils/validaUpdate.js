const QueryUtils = require('./queryUtil')
class ValidaUpdate {
    static async validaUpdate(codigo,tabela,id){
        console.log("AQUIVALIDATE",codigo)
        try{
            const CodigoRegistroAtual = await QueryUtils.codigoModelo(codigo,tabela)
            if(CodigoRegistroAtual){
                if(CodigoRegistroAtual.id ==  id){
                    console.log("true1",CodigoRegistroAtual.id ,id,CodigoRegistroAtual)
                    return true
                }else{            
                    if(!CodigoRegistroAtual){
                        console.log("true2",CodigoRegistroAtual)
                        return true;
                    }else{
                        return false;
                    }
                }
            }else{
                console.log("true3")
                return true
            }
           
        }catch(error){
            console.log(error);
            return false;
        }
        
       
    }   
}
    
 module.exports = ValidaUpdate;
