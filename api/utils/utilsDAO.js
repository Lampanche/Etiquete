const sequelize = require('sequelize')
const {Op} = require('sequelize')
class UtilsDAO {
    static  whereClausula(filtroString,ativo){
        
          
          let filtros = []   
          if(typeof filtroString != "undefined" && filtroString.length > 0){
            filtros = filtroString.split(',').map(item => item.trim());
          }
          
         
        let filtrosIndividuais = [] 
        
        if( filtros.length > 0){    
          filtrosIndividuais = filtros.map(filtro => ({
            [Op.or]: [
              {
                nome: {
                  [sequelize.Op.like]: `%${filtro}%`, 
                },
              }    
              
            ],
          }));
        }
       
        
        const filtroAtivo = [ativo]
         let filtroAnd = []
          
        if(ativo == 'true' || ativo == 'false'){
          console.log("teste")
           if(ativo == 'true'){       
             filtroAnd = filtroAtivo.map(filtro => ({
             [Op.and]:[
               {
                 ativo:true
               }
             ]
           }))
         }
         if(ativo == "false"){     
           filtroAnd = filtroAtivo.map(filtro => ({
             [Op.and]:[
               {
                 ativo:false
               }
             ]
           }))
      
         }
       }
        console.log(filtrosIndividuais,  "teste" )
          
          let whereClause = null;
          if(filtrosIndividuais.length > 0 && filtroAnd.length > 0 ){
            console.log("[FILTRO]1");
            whereClause = {      
              [sequelize.Op.or]: filtrosIndividuais,
              [sequelize.Op.and]:filtroAnd,
            };
          }else if(filtrosIndividuais.length > 0  &&  filtroAnd.length == 0 ){
            console.log("[FILTRO]2");
            whereClause = {      
              [sequelize.Op.or]: filtrosIndividuais,        
            };
          }else if(filtrosIndividuais.length == 0  &&  filtroAnd.length > 0 ){
            console.log("[FILTRO]3");
            whereClause = {      
              [sequelize.Op.or]: filtroAnd,        
            };
          }
        return whereClause;
        
        
    }
}
module.exports = UtilsDAO;   
