import { Container } from "./styles.js";

import { FiSave } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";

import iconTipo from "../../assets/icons8-tipi-58.png";
import iconModelo from "../../assets/icons8-models-64.png";
import iconRegiao from "../../assets/icons8-código-de-região-48.png";
import iconFornecedor from "../../assets/icons8-fornecedor-64.png";
import IconTamanho from "../../assets/icons8-expandir-100.png";
import { api } from "../../Service/api.js";
import { useEffect, useState } from "react";

const { ipcRenderer } = window.require("electron");


export function ModalCadastroInfosProduto({closeModal, target, setResponse, setComunicacao}){

  const [ valueInputCadastroInfos, setValueInputCadastroInfos ] = useState("");
  const [senha,setSenha] = useState();
  const [login,setLogin] = useState();
  const [usuario,setUsuario] = useState();
  
  const data = 
  {
    nome: valueInputCadastroInfos,
    
  }

  async function cadastroInfos(target)
  {
    if(target === "tipo")
    {
      try {
        const responseModelos = await api.get(`/api/modelos`)
        const responseTipos = await api.get(`/api/tipos`)
        const response = await api.post("/api/tipos", data)
        setResponse(response)
        sendIpcAndReturn(responseModelos, responseTipos)

      } catch (error) {
        setResponse(error)
      }

    }
    if(target === "modelo")
    {
      try {
        const response = await api.post("/api/modelos", data)
        setResponse(response)
        sendIpcAndReturn()
      } catch (error) {
        setResponse(error)
      }
    }
    if(target === "tamanho")
    {
      try {
        setResponse(await api.post("/api/tamanhos", data))
      } catch (error) {
        setResponse(error)
      }
    }
    if(target === "regiao")
    {
      try {
        setResponse(await api.post("/api/regiao", data))
      } catch (error) {
        setResponse(error)
      }
    }
    if(target === "fornecedor")
    {
      try {
        
        const response = await api.post("/api/fornecedores", data)
        const responseFornecedor = await api.get("/api/fornecedores")
        setResponse(response)
        sendIpcAndReturn(null, null, responseFornecedor)
      } catch (error) {
        setResponse(error)
      }
    }

  }

  async function getUsuarioCadastrado(){
    const usuarios = await api.get("api/users");
   
    if( typeof usuarios.data.users  != "undefined" && usuarios.data.users.length > 0){
        
         const usuarioCadastrado = usuarios.data.users[0]
         setUsuario(usuarioCadastrado);    
         setSenha(usuarioCadastrado.senha)
         setLogin(usuarioCadastrado.login)
    }
    
 }

  function sendIpcAndReturn(responseModelos, responseTipos, responseFornecedor)
  { 
    let returnNex

    const dataIpc = {
      nome: valueInputCadastroInfos,
      login: login,
      senha: senha
    }

    const strObj = JSON.stringify(dataIpc)

    if(usuario != null && typeof usuario != "undefined" && usuario != "" && usuario.login != null && usuario.login != "" && usuario.senha != null && usuario.senha != "" )
    {      

      if(target === 'tipo')
      { 
        const dataModifyIpc = {
          nome: valueInputCadastroInfos,
          listaModelos: responseModelos.data,
          listaTipos: responseTipos.data,
          login:login,
          senha:senha
        }

        const strDataModifyIpc = JSON.stringify(dataModifyIpc)

        if(typeof dataModifyIpc.nome == "undefined" || dataModifyIpc.nome == null || dataModifyIpc.nome == ""  )
        {
          returnNex = "Nome não pode ser vazio"
          
        }else{
        
          returnNex = ipcRenderer.sendSync('getTipoData', strDataModifyIpc)
         
          //returnNex.win.show();

        }

      }
    
      if(target === 'modelo')
      {
        if(typeof dataIpc.nome == "undefined" || dataIpc.nome == null || dataIpc.nome == ""  ){
          returnNex = "Nome não pode ser vazio";
         
        }else{
          returnNex = ipcRenderer.sendSync('getModeloData', strObj)
          
          
        }
        
      }
    
        if(target === 'fornecedor')
        {
          
          const dataFornecedor = {
            nome: valueInputCadastroInfos,
            listaFornecedores: responseFornecedor.data,
            login:login,
            senha:senha
          }

          const dataFornecedorStr = JSON.stringify(dataFornecedor)

          if(typeof dataFornecedor.nome == "undefined" || dataFornecedor.nome == null || dataFornecedor.nome == ""  ){
            returnNex = "Nome não pode ser vazio";
            console.log("AQUI1",dataFornecedor);
          }else{
            console.log("AQUI2",dataFornecedor);
            returnNex = ipcRenderer.sendSync('getFornecedorData', dataFornecedorStr)
          }
        
        }

    }else{
        returnNex = "E necessario ter usuario cadastrado para o cadastro ser enviado ao nex."
      }
      
      alert(returnNex); 
      ipcRenderer.send('minimizar-janela');
      ipcRenderer.send('maximiza-janela');
      

  } 

useEffect(()=>{
  getUsuarioCadastrado();
},[])
  
 

  if(target === "tipo")
  {
    return(

      <Container>
        
        <div className="wrappedContentModal">

          <div className="close">

            <button onClick={() => closeModal(false)}>
              <IoMdCloseCircleOutline/>
            </button>

          </div>

          <div className="title">
  
            <h3>Cadastro de tipos</h3>
            <img src={iconTipo} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="nome" onChange={(e) => setValueInputCadastroInfos(e.currentTarget.value)}></input>
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button onClick={ async () =>
                {
                closeModal(false)
                setComunicacao(prevstate => prevstate = !prevstate)
                cadastroInfos(target)
                }
                }>
                Salvar
                <FiSave/>
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </Container>
  
    )

  }

  if(target === "modelo")
  {
    return(

      <Container>
        
        <div className="wrappedContentModal">
  
          <div className="close">

            <button onClick={() => closeModal(false)}>
              <IoMdCloseCircleOutline/>
            </button>

          </div>

          <div className="title">
  
            <h3>Cadastro de modelo</h3>
            <img src={iconModelo} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="nome" onChange={(e) => setValueInputCadastroInfos(e.currentTarget.value)}></input>
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button  onClick={() =>
                {
                closeModal(false)
                setComunicacao(prevstate => prevstate = !prevstate)
                cadastroInfos(target)
                }
                 }>
                Salvar
                <FiSave/>
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </Container>
  
    )
  }

  if(target === "tamanho")
  {
    return(

      <Container>
        
        <div className="wrappedContentModal">

          <div className="close">

            <button onClick={() => closeModal(false)}>
              <IoMdCloseCircleOutline/>
            </button>

          </div>
  
          <div className="title">
  
            <h3>Cadastro de tamanho</h3>
            <img src={IconTamanho} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="nome" onChange={(e) => setValueInputCadastroInfos(e.currentTarget.value)}></input>
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button  onClick={() =>
                {
                closeModal(false)
                setComunicacao(prevstate => prevstate = !prevstate)
                cadastroInfos(target)
                }
                }>
                Salvar
                <FiSave/>
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </Container>
  
    )
  }

  if(target === "regiao")
  {
    return(

      <Container>
        
        <div className="wrappedContentModal">

          <div className="close">

            <button onClick={() => closeModal(false)}>
              <IoMdCloseCircleOutline/>
            </button>

          </div>
  
          <div className="title">
  
            <h3>Cadastro de região</h3>
            <img src={iconRegiao} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="nome" onChange={(e) => setValueInputCadastroInfos(e.currentTarget.value)}></input>
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button  onClick={() =>
                {closeModal(false)
                setComunicacao(prevstate => prevstate = !prevstate)
                cadastroInfos(target)}
                 }>
                Salvar
                <FiSave/>
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </Container>
  
    )
  }

  if(target === "fornecedor")
  {
    return(

      <Container>
        
        <div className="wrappedContentModal">

          <div className="close">

            <button onClick={() => closeModal(false)}>
              <IoMdCloseCircleOutline/>
            </button>

          </div>
  
          <div className="title">
  
            <h3>Cadastro de fornecedor</h3>
            <img src={iconFornecedor} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="nome" onChange={(e) => setValueInputCadastroInfos(e.currentTarget.value)}></input>
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button onClick={() =>
                {
                closeModal(false)
                setComunicacao(prevstate => prevstate = !prevstate)
                cadastroInfos(target)
                }
                }>
                Salvar
                <FiSave/>
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </Container>
  
    )
}

}
