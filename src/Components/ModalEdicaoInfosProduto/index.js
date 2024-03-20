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

export function ModalEdicaoInfosProduto({closeModal, target, setResponse, setComunicacao}){

  const [ getResponse, setGetResponse ] = useState(null);
  const [ getResponseUnico, setGetResponseUnico ] = useState(null);

  const [ optionSelected, setOptionSelected ] = useState(null); 
  const [ valueInputEditName, setValueInputEditName ] = useState('');
  const [ valueInputOriginal, setValueInputOriginal ] = useState('');
  const [senha,setSenha] = useState();
  const [login,setLogin] = useState();
  const [usuario,setUsuario] = useState();

  const [ checkedAtivo, setCheckedAtivo ] = useState(false);

  async function getCadastroInfos(target)
  {
    if(target === "tipo")
    {
      setGetResponse(await api.get("/api/tipos"))
    }

    if(target === "modelo")
    {
      setGetResponse(await api.get("/api/modelos"))
    }

    if(target === "tamanho")
    {
      setGetResponse(await api.get("/api/tamanhos"))
    }

    if(target === "regiao")
    {
      setGetResponse(await api.get("/api/regiao"))
    }

    if(target === "fornecedor")
    {
      setGetResponse(await api.get("/api/fornecedores"))
    }

  }

  async function sendIpcGetReturn(responseOri)
  {

    let editNex
    if(typeof usuario == "undefined" || usuario == "" || usuario == null 
    || typeof usuario.senha == "undefined" || usuario.senha == "" || usuario.senha == null ||
    typeof usuario.login == "undefined" || usuario.login == "" || usuario.login == null){
      alert("Cadastro de usuario nex inexistente ou invalido,necessario usuario para cadastrar registros no nex")
      ipcRenderer.send('minimizar-janela');
      ipcRenderer.send('maximiza-janela');
    }else{ 

    
    if(target === 'tipo')
    {
      const dataIpc = {
        tipo: responseOri.data.tipo.nome,
        tipoAtt: valueInputEditName,
        login:login,
        senha:senha
      }
  
      const strObj = JSON.stringify(dataIpc)
  
      editNex = ipcRenderer.sendSync('getDataEditTipo', strObj)
    }

    if(target === 'modelo')
    {
      const dataIpc = {
        modelo: responseOri.data.modelo.nome,
        modeloAtt: valueInputEditName,
        login:login,
        senha:senha
      }
  
      const strObj = JSON.stringify(dataIpc)
  
      editNex = ipcRenderer.sendSync('getDataEditModelo', strObj)
    }

    if(target === 'fornecedor')
    {

      const dataIpc = {
        fornecedor: responseOri.data.fornecedor.nome,
        fornecedorAtt: valueInputEditName,
        login:login,
        senha:senha
      }
  
      const strObj = JSON.stringify(dataIpc)
  
      editNex = ipcRenderer.sendSync('getDataEditFornecedor', strObj)
    }

    alert(editNex)
    ipcRenderer.send('minimizar-janela');
    ipcRenderer.send('maximiza-janela');
  }

  }

  async function editCadastroInfos()
  {

    const data = {
      nome: valueInputEditName,
      ativo: checkedAtivo ? checkedAtivo : false,
      login:login,
      senha:senha
    }

    if(target === "tipo")
    {
      try {
        const responseOri = await api.get(`/api/tipos/${optionSelected}`)
        setResponse(await api.put(`/api/tipos/${optionSelected}`, data))
        sendIpcGetReturn(responseOri)
      } catch (error) {
        setResponse(error)
      }
    }

    if(target === "modelo")
    {
      try {
        const responseOri = await api.get(`/api/modelos/${optionSelected}`)
        setResponse(await api.put(`/api/modelos/${optionSelected}`, data))
        sendIpcGetReturn(responseOri)
      } catch (error) {
        setResponse(error)
      }
    }

    if(target === "tamanho")
    {
      try {
        setResponse(await api.put(`/api/tamanhos/${optionSelected}`, data))
      } catch (error) {
        setResponse(error)
      }
    }

    if(target === "regiao")
    {
      try {
        setResponse(await api.put(`/api/regiao/${optionSelected}`, data))
      } catch (error) {
        setResponse(error)
      }
    }

    if(target === "fornecedor")
    {
      try {
        const responseOri = await api.get(`/api/fornecedores/${optionSelected}`)
        setResponse(await api.put(`/api/fornecedores/${optionSelected}`, data))
        sendIpcGetReturn(responseOri)
      } catch (error) {
        setResponse(error)
      }
    }

  }

  async function getUnico()
  {
    
    if(target === "tipo")
    {
      setGetResponseUnico(await api.get(`/api/tipos/${optionSelected}`))
    }

    if(target === "modelo")
    {
      setGetResponseUnico(await api.get(`/api/modelos/${optionSelected}`))
    }

    if(target === "tamanho")
    {
      setGetResponseUnico(await api.get(`/api/tamanhos/${optionSelected}`))
    }

    if(target === "regiao")
    {
      setGetResponseUnico(await api.get(`/api/regiao/${optionSelected}`))
    }

    if(target === "fornecedor")
    {
      setGetResponseUnico(await api.get(`/api/fornecedores/${optionSelected}`))
    }
    
  }

  function setCheckedAndInput()
  {

    if(target === "tipo")
    {
      setValueInputEditName(getResponseUnico.data.tipo.nome)
  
      setCheckedAtivo(getResponseUnico.data.tipo.ativo)
    }

    if(target === "modelo")
    {
      setValueInputEditName(getResponseUnico.data.modelo.nome)
  
      setCheckedAtivo(getResponseUnico.data.modelo.ativo)
    }

    if(target === "tamanho")
    {
      setValueInputEditName(getResponseUnico.data.tamanho.nome)
  
      setCheckedAtivo(getResponseUnico.data.tamanho.ativo)
    }

    if(target === "regiao")
    {
      setValueInputEditName(getResponseUnico.data.regiao.nome)
  
      setCheckedAtivo(getResponseUnico.data.regiao.ativo)
    }

    if(target === "fornecedor")
    {
      setValueInputEditName(getResponseUnico.data.fornecedor.nome)
  
      setCheckedAtivo(getResponseUnico.data.fornecedor.ativo)
    }

  
  }
  async function getUsuarioCadastrado(){
    const usuarios = await api.get("api/users");
   
    
    if( typeof usuarios.data.users  != "undefined" && usuarios.data.users.length> 0){
        
         const usuarioCadastrado = usuarios.data.users[0]
         setUsuario(usuarioCadastrado);    
         setSenha(usuarioCadastrado.senha)
         setLogin(usuarioCadastrado.login)
    }
    
 }
  
  useEffect(() => {
    getCadastroInfos(target)
  },[])
  useEffect(() => {
    getUsuarioCadastrado()
  },[])

  useEffect(() => {
    
    if(optionSelected !== null)
    {
      getUnico()
    }
    
  },[optionSelected])

  useEffect(() => {
    if(getResponseUnico !== null)
    {
      setCheckedAndInput()
    }
  },[getResponseUnico])

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
  
            <h3>Edição de tipos</h3>
            <img src={iconTipo} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="tipos">Selecione o tipo</label>

              <select name="tipos" id="tipos" required onChange={(e) => setOptionSelected(e.currentTarget.value)}>

                <option selected disabled>
                  Selecione
                </option>

                {
                  getResponse
                  ?
                  getResponse.data.tipos.map(tipo => (
                    <option value={tipo.id} key={String(tipo.id)}>
                      {tipo.nome}
                    </option>
                  ))
                  :
                  ''
                }

              </select>

              {
                getResponseUnico ?

                <div className="wrappedEdicaoNome">

                  <label htmlFor="edicaoTipos">Edição do nome</label>  
                  <input type="text" id="edicaoTipos" value={valueInputEditName} onChange={(e) => setValueInputEditName(e.currentTarget.value)}></input>

                </div>
                :
                <div className="wrappedEdicaoNome">

                  <label htmlFor="edicaoTipos">Edição do nome</label>  
                  <input type="text" id="edicaoTipos" value={valueInputEditName} onChange={(e) => setValueInputEditName(e.currentTarget.value)}></input>

                </div>
              }

              {
                getResponseUnico ?

                <div className="wrappedEdicaoStatus">

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="ativo">Ativado</label>  
                    <input type="checkbox" id="ativo" checked={checkedAtivo} onChange={() => setCheckedAtivo(prevstate => prevstate = !prevstate)}></input>
                  </div>

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="desativado">Desativado</label>  
                    <input type="checkbox" id="desativado" checked={!checkedAtivo} onChange={() => setCheckedAtivo(prevstate => prevstate = !prevstate)}></input>
                  </div>

                </div>

                :

                <div className="wrappedEdicaoStatus">

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="ativo">Ativado</label>  
                    <input type="checkbox" id="ativo" checked={checkedAtivo} onChange={() => {}}></input>
                  </div>

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="desativado">Desativado</label>  
                    <input type="checkbox" id="desativado" checked={checkedAtivo} onChange={() => {}}></input>
                  </div>

                </div>
              }
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button onClick={() => {closeModal(false)
              editCadastroInfos()
              setComunicacao(prevstate => prevstate = !prevstate)
              }}>
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
  
            <h3>Edição de modelos</h3>
            <img src={iconModelo} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="modelos">Selecione o modelo</label>
             
              <select name="modelos" id="modelos" required onChange={(e) => setOptionSelected(e.currentTarget.value)}>

                <option disabled selected>
                  Selecione
                </option>

                {
                  getResponse
                  ?
                  getResponse.data.modelos.map(tipo => (
                    <option value={tipo.id} key={String(tipo.id)}>
                      {tipo.nome}
                    </option>
                  ))
                  :
                  ''
                }

              </select>

              <div className="wrappedEdicaoNome">

                <label htmlFor="edicaoModelos">Edição do nome</label>  
                <input type="text" id="edicaoModelos" value={valueInputEditName} onChange={(e) => setValueInputEditName(e.currentTarget.value)}></input>

              </div>

              {
                getResponseUnico ?

                  <div className="wrappedEdicaoStatus">

                    <div className="wrappedInputsAeDEdicao">
                      <label htmlFor="edicaoAtivo">Ativado</label>  
                      <input type="checkbox" id="edicaoAtivo" checked = {checkedAtivo} onChange={() => setCheckedAtivo(prevsate => prevsate = !prevsate)}></input>
                    </div>

                    <div className="wrappedInputsAeDEdicao">
                      <label htmlFor="edicaoDesativado">Desativado</label>  
                      <input type="checkbox" id="edicaoDesativado" checked={!checkedAtivo} onChange={() => setCheckedAtivo(prevsate => prevsate = !prevsate)}></input>
                    </div>

                  </div>
                :

                  <div className="wrappedEdicaoStatus">

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoAtivo">Ativado</label>  
                    <input type="checkbox" id="edicaoAtivo" checked={checkedAtivo} onChange={() => {}}></input>
                  </div>

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoDesativado">Desativado</label>  
                    <input type="checkbox" id="edicaoDesativado" checked={checkedAtivo} onChange={() => {}}></input>
                  </div>

                </div>

              }
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button onClick={() => {
                editCadastroInfos()
                setComunicacao(prevstate => prevstate = !prevstate)
                closeModal(false)}}>
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
  
            <h3>Edição de tamanhos</h3>
            <img src={IconTamanho} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="tamanhos">Selecione o tamanho</label>

              <select name="tamanhos" id="tamanhos" required onChange={(e) => setOptionSelected(e.currentTarget.value)}>

                <option disabled selected>
                  Selecione
                </option>

                {
                  getResponse
                  ?
                  getResponse.data.tamanhos.map(tipo => (
                    <option value={tipo.id} key={String(tipo.id)}>
                      {tipo.nome}
                    </option>
                  ))
                  :
                  ''
                }

              </select>

              <div className="wrappedEdicaoNome">

                <label htmlFor="edicaoTamanhos">Edição do nome</label>  
                <input type="text" id="edicaoTamanhos" value={valueInputEditName} onChange={(e) => setValueInputEditName(e.currentTarget.value)}></input>

              </div>

              {
                getResponseUnico ?

                <div className="wrappedEdicaoStatus">

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoAtivo">Ativado</label>  
                    <input type="checkbox" id="edicaoAtivo" checked = {checkedAtivo} onChange={() => setCheckedAtivo(prevsate => prevsate = !prevsate)}></input>
                  </div>

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoDesativado">Desativado</label>  
                    <input type="checkbox" id="edicaoDesativado" checked = {!checkedAtivo} onChange={() => setCheckedAtivo(prevsate => prevsate = !prevsate)}></input>
                  </div>

                </div>

                :

                <div className="wrappedEdicaoStatus">

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoAtivo">Ativado</label>  
                    <input type="checkbox" id="edicaoAtivo" checked = {checkedAtivo} onChange={() => {}}></input>
                  </div>

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoDesativado">Desativado</label>  
                    <input type="checkbox" id="edicaoDesativado" checked = {checkedAtivo} onChange={() => {}}></input>
                  </div>

                </div>
              }
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button onClick={() => {
                editCadastroInfos()
                setComunicacao(prevstate => prevstate = !prevstate)
                closeModal(false)}}>
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
  
            <h3>Edição de regiões</h3>
            <img src={iconRegiao} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="regioes"> Selecione a região</label>

              <select name="regioes" id="regioes" required onChange={(e) => setOptionSelected(e.currentTarget.value)}>

                <option disabled selected>
                  Selecione
                </option>

                {
                  getResponse
                  ?
                  getResponse.data.regioes.map(tipo => (
                    <option value={tipo.id} key={String(tipo.id)}>
                      {tipo.nome}
                    </option>
                  ))
                  :
                  ''
                }

              </select>

              <div className="wrappedEdicaoNome">

                <label htmlFor="edicaoRegioes">Edição do nome</label>  
                <input type="text" id="edicaoRegioes" value={valueInputEditName} onChange={(e) => setValueInputEditName(e.currentTarget.value)}></input>

              </div>

              {
                getResponseUnico?

                <div className="wrappedEdicaoStatus">

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoAtivo">Ativado</label>  
                    <input type="checkbox" id="edicaoAtivo" checked ={checkedAtivo} onChange={() => setCheckedAtivo(prevsate => prevsate = !prevsate)}></input>
                  </div>

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoDesativado">Desativado</label>  
                    <input type="checkbox" id="edicaoDesativado" checked ={!checkedAtivo} onChange={() => setCheckedAtivo(prevsate => prevsate = !prevsate)}></input>
                  </div>

                </div>

                :

                <div className="wrappedEdicaoStatus">

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoAtivo">Ativado</label>  
                    <input type="checkbox" id="edicaoAtivo" checked = {checkedAtivo} onChange={() => {}}></input>
                  </div>

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoDesativado">Desativado</label>  
                    <input type="checkbox" id="edicaoDesativado" checked = {checkedAtivo} onChange={() => {}}></input>
                  </div>

                </div>
              }
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button onClick={() => {
                editCadastroInfos()
                setComunicacao(prevstate => prevstate = !prevstate)
                closeModal(false)}}>
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
  
            <h3>Edição de fornecedores</h3>
            <img src={iconFornecedor} ></img>
  
          </div>
  
          <div className="wrappedMain">
  
            <div className="wrappedInputModal">
  
              <label htmlFor="fornecedores">Selecione o fornecedor</label>

              <select name="fornecedores" id="fornecedores" required onChange={(e) => setOptionSelected(e.currentTarget.value)}>

                <option disabled selected>
                  Selecione
                </option>

                {
                  getResponse
                  ?
                  getResponse.data.fornecedores.map(tipo => (
                    <option value={tipo.id} key={String(tipo.id)}>
                      {tipo.nome}
                    </option>
                  ))
                  :
                  ''
                }

              </select>

              <div className="wrappedEdicaoNome">

                <label htmlFor="edicaoFornecedores">Edição do nome</label>  
                <input type="text" id="edicaoFornecedores" value={valueInputEditName} onChange={(e) => setValueInputEditName(e.currentTarget.value)}></input>

              </div>

              {
                getResponseUnico ?

                <div className="wrappedEdicaoStatus">

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoAtivo">Ativado</label>  
                    <input type="checkbox" id="edicaoAtivo" checked ={checkedAtivo} onChange={() => setCheckedAtivo(prevsate => prevsate = !prevsate)}></input>
                  </div>

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoDesativado">Desativado</label>  
                    <input type="checkbox" id="edicaoDesativado" checked ={!checkedAtivo} onChange={() => setCheckedAtivo(prevsate => prevsate = !prevsate)}></input>
                  </div>

                </div>

                :

                <div className="wrappedEdicaoStatus">

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoAtivo">Ativado</label>  
                    <input type="checkbox" id="edicaoAtivo" checked ={checkedAtivo} onChange={() => {}}></input>
                  </div>

                  <div className="wrappedInputsAeDEdicao">
                    <label htmlFor="edicaoDesativado">Desativado</label>  
                    <input type="checkbox" id="edicaoDesativado" checked ={checkedAtivo} onChange={() => {}}></input>
                  </div>

                </div>
              }
  
            </div>
  
            <div className="btnWrappedModal">
  
              <button onClick={() => {
                editCadastroInfos()
                setComunicacao(prevstate => prevstate = !prevstate)
                closeModal(false)}}>
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