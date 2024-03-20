import { Container } from "./styles.js";

import { PesquisaPorFiltro } from "../PesquisaPorFiltro/index.js";
import { useEffect, useState } from "react";
import { AtivoOrDesativado } from "../../Components/AtivoOrDesativo";

import { BiEdit,BiAddToQueue } from "react-icons/bi";

import { api } from "../../Service/api.js";

const { ipcRenderer } = window.require('electron');

export function ContentMainList({ setPlace, lista})
{

  const [ getResponseListagem, setGetResponseListagem ] = useState(null)
  const [senha,setSenha] = useState()
  const [login,setLogin] = useState()
  const [usuario,setUsuario] = useState()

  async function getAllResponsesListagem()
  {
    if(lista === "fornecedores")
    {
      setGetResponseListagem(await api.get("/api/fornecedores"))
    }

    if(lista === "tipos")
    {
      setGetResponseListagem(await api.get("/api/tipos"))
    }

    if(lista === "modelos")
    {
      setGetResponseListagem(await api.get("/api/modelos"))
    }

    if(lista === "regioes")
    {
      setGetResponseListagem(await api.get("/api/regiao"))
    }

  }
  async function getUser(){
    const usuarios = await api.get("api/users");
      console.log(usuarios.data.users.length);
       
       if( typeof usuarios.data.users  != "undefined" && usuarios.data.users.length> 0){            
            const usuario = usuarios.data.users[0]
            setUsuario(usuario);
            setSenha(usuario.senha)
            setLogin(usuario.login)           
            
       }
  }

  function reenviarEdicao(ipcRota,nome,nomeAnterior)
  {   

    let editNex
  
    if(usuario != null && typeof usuario != "undefined" && usuario != "" && usuario.login != null && usuario.login != "" && usuario.senha != null && usuario.senha != "" )
    {

      const envioObject = {      
          anterior: nomeAnterior,
          atual: nome,
          login:login,
          senha:senha,
          reenvioEdicao:true     
      }

      const strObj = JSON.stringify(envioObject);
      editNex = ipcRenderer.sendSync(ipcRota, strObj)
      alert(editNex);
      ipcRenderer.send('minimizar-janela');
      ipcRenderer.send('maximiza-janela');

    }
    else
    {
      editNex = "E necessario ter usuario cadastrado para a edição ser enviado ao nex."
      alert(editNex)
      ipcRenderer.send('minimizar-janela');
      ipcRenderer.send('maximiza-janela');
    }

  }


  async function reenvioCadastrosNex(entidade,id,ipcRota)
  { 
    let cadastroNex

    if(usuario != null && typeof usuario != "undefined" && usuario != "" && usuario.login != null && usuario.login != "" && usuario.senha != null && usuario.senha != "" )

    {

      try {

        const response = await api.get(`/api/${entidade}/${id}`)
        let dataIpc = "";
        if(entidade == "tipos"){
          const responseModelos = await api.get(`api/modelos`)
          const responseTipos = await api.get(`api/tipos`)
          dataIpc = {
            nome: response.data.tipo.nome,
            listaTipos:responseTipos.data,
            listaModelos: responseModelos.data,
            login:login,
            senha:senha
          }

        }else if(entidade == "fornecedores"){
          const responseFornecedores = await api.get(`api/fornecedores`)
          dataIpc = {
            nome: response.data.fornecedor.nome, 
            listaFornecedores: responseFornecedores.data,     
            login:login,
            senha:senha
          }
          }else{
            dataIpc = {
              nome: response.data.modelo.nome,          
              login:login,
              senha:senha
            }
          }
          const strObj = JSON.stringify(dataIpc)

          cadastroNex = ipcRenderer.sendSync(ipcRota, strObj)

          alert(cadastroNex)
          ipcRenderer.send('minimizar-janela');
          ipcRenderer.send('maximiza-janela');

          window.location.reload()

        }catch (error) 
      {
        console.log(error.message)
        cadastroNex = "Ocorreu um erro, Não foi possível cadastrar."
        alert(cadastroNex,error.message)
        ipcRenderer.send('minimizar-janela');
        ipcRenderer.send('maximiza-janela');
      }

    }
    else
    {
      cadastroNex = "E necessario ter usuario cadastrado para o cadastro ser enviado ao nex."
      alert(cadastroNex)
      ipcRenderer.send('minimizar-janela');
      ipcRenderer.send('maximiza-janela');
    }

  }
  

  useEffect(() => {
    getAllResponsesListagem()
    getUser();
  },[])

  return(

    <Container>

      <PesquisaPorFiltro  place={setPlace} localRender={lista} setGetResponselistInfos = {setGetResponseListagem}/>

      <div className="wrappedList">

        <ul>

          {
            getResponseListagem && getResponseListagem.data.fornecedores ?

            getResponseListagem.data.fornecedores.map((fornecedor) => (

              <li key={fornecedor.id}> 
                
                <div className="wrappedNameAndStatus">

                  <div className="infos"> 
                                                         
                    <div className="wrappedName">
                      <h2>Nome:</h2>
                      <span>{fornecedor.nome}</span> 
                    </div>
                    
                    <AtivoOrDesativado ativo={fornecedor.ativo}/> 
                  </div>
                  <div className="infos">
                                                          
                    <div className="wrappedName">
                         <h2>Código:</h2>
                        <span>{fornecedor.id}</span> 
                        </div>                                                                 
                      
                    </div>

                  <div className="actions">
                    <button onClick={()=>{reenvioCadastrosNex("fornecedores",fornecedor.id,"getFornecedorData")}} title="Reenvio de cadastro do NEX.">
                      <BiAddToQueue/>
                    </button>
                    <button title="Reenvio de edição do NEX." onClick={(e)=>reenviarEdicao("getDataEditFornecedor",fornecedor.nome,fornecedor.nomeAnterior)}>
                      <BiEdit/>
                    </button>

                    

                  </div>

                </div>

              </li>

            ))

            :

            ""

          }

          {
            getResponseListagem && getResponseListagem.data.modelos ?

            getResponseListagem.data.modelos.map((modelo) => (

              <li key={modelo.id}> 
                <div className="wrappedNameAndStatus">

                  <div className="infos">
                    
                    <div className="wrappedName">
                      <h2>Nome:</h2>
                      <span>{modelo.nome}</span> 
                    </div>

                    <AtivoOrDesativado ativo={modelo.ativo}/> 
                  </div>
                  <div className="infos"> 
                                                          
                    <div className="wrappedName">
                         <h2>Código:</h2>
                        <span>{modelo.id}</span> 
                        </div>                                                                 
                      
                    </div>

                  <div className="actions">
                    <button onClick={()=>{reenvioCadastrosNex("modelos",modelo.id,"getModeloData")}} title="Reenvio de cadastro do NEX.">
                      <BiAddToQueue/>
                    </button>

                    <button title="Reenvio de edição do NEX." onClick={(e)=>reenviarEdicao("getDataEditModelo",modelo.nome,modelo.nomeAnterior)}>
                      <BiEdit/>
                    </button>

                    

                  </div>

                </div>
              </li>

            ))

            :

            ""
          }

          {
            getResponseListagem && getResponseListagem.data.tipos ?

            getResponseListagem.data.tipos.map((tipo) => (
  
              <li key={tipo.id}>

                  <div className="wrappedNameAndStatus">

                    <div className="infos">
                      
                      <div className="wrappedName">
                        <h2>Nome:</h2>
                        <span>{tipo.nome}</span> 
                      </div>

                      <AtivoOrDesativado ativo={tipo.ativo}/> 
                    </div>
                    <div className="infos">                                                          
                        <div className="wrappedName">
                              <h2>Código:</h2>
                             <span>{tipo.id}</span> 
                           </div>                                                                
                                                            
                         </div>

                    <div className="actions">
                      <button onClick={()=>{reenvioCadastrosNex("tipos",tipo.id,"getTipoData")}} title="Reenvio de cadastro do NEX.">
                        <BiAddToQueue/>
                      </button>

                      <button title="Reenvio de edição do NEX." onClick={(e)=>reenviarEdicao("getDataEditTipo",tipo.nome,tipo.nomeAnterior)}>
                        <BiEdit/>
                      </button>


                    </div>

                  </div>
              </li>
  
            ))

            :

            ""

          }
            
          {
            getResponseListagem && getResponseListagem.data.regioes ?

            getResponseListagem.data.regioes.map((regiao) => (
  
              <li key={regiao.id}> 
                <div className="wrappedNameAndStatus">

                  <div className="infos">
                    
                    <div className="wrappedName">
                      <h2>Nome:</h2>
                      <span>{regiao.nome}</span> 
                    </div>

                    <AtivoOrDesativado ativo={regiao.ativo}/> 
                  </div>
                  <div className="infos"> 
                                                          
                    <div className="wrappedName">
                       <h2>Código:</h2>
                        <span>{regiao.id}</span> 
                     </div>                                                                
                                                              
                  </div>

                  <div style={{visibility: "hidden"}} className="actions">

                    <button title="Reenvio de edição do NEX.">
                      <BiEdit/>
                    </button>

                    <button title="Reenvio de cadastro do NEX.">
                      <BiAddToQueue/>
                    </button>

                  </div>

                </div>
              </li>
  
            ))
  
            :
  
            ''
          }  

        </ul>

      </div>

    </Container>

  )
}