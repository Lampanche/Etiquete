import { Container } from "./styles.js";
import { Header } from "../../Components/Header/index.js";
import { Navigation } from "../../Components/Navigation/index.js";
import { DropDownMenu } from "../../Components/DropDownMenu";
import {DropDownMenuNex} from "../../Components/DropDownMenuNex";
import { ModalCadastroInfosProduto } from "../../Components/ModalCadastroInfosProduto";
import { ModalEdicaoInfosProduto } from "../../Components/ModalEdicaoInfosProduto";
import { ModalResponseServer } from "../../Components/ModalResponseServer";

import { NumericFormat } from "react-number-format";

import iconProdutoAdd from "../../assets/icons8-produtos-64.png";
import iconAdd from "../../assets/icons8-adicionar-100.png";
import { FiSave } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { GrIntegration } from "react-icons/gr";

import { api } from "../../Service/api.js";

import { useState, useEffect, useRef } from "react";

const { ipcRenderer } = window.require('electron');

export function Add()
{

  const [ comunicacaoAddModais, setComunicacaoAddModais ] = useState(false);
  const [ valueResponseServer, setValueResponseServer ] = useState(null);

  const [ dropActive, setDropActive ] = useState(false);
  const [ targetBtn, setTarget ] = useState(null);

 
  

  const [ modalActiveCadastro, setModalActiveCadastro ] = useState(false);
  const [ modalActiveDesativar, setModalActiveEditar ] = useState(false);
  const [ idTargetActiveModal, setIdTargetActiveModal ] = useState(null);

  const [ getResponseAddTipos, setGetResponseAddTipos ] = useState(null);
  const [ getResponseAddModelos, setGetResponseAddModelos ] = useState(null);
  const [ getResponseAddTamanhos, setGetResponseAddTamanhos ] = useState(null);
  const [ getResponseAddRegioes, setGetResponseAddRegioes ] = useState(null);
  const [ getResponseAddFornecedores, setGetResponseAddFornecedores ] = useState(null);

  const [ valueInputName, setValueInputName ] = useState("");
  const [ valueSelectTipo, setValueSelectTipo ] = useState("");
  const [ valueSelectModelo, setValueSelectModelo ] = useState("");
  const [ valueSelectTamanho, setValueSelectTamanho ] = useState("");
  const [ valueInputCusto, setValueInputCusto ] = useState("");
  const [ valueInputVenda, setValueInputVenda ] = useState("");
  const [ valueSelectRegiao, setValueSelectRegiao ] = useState("");
  const [ valueSelectFornecedor, setValueSelectFornecedor ] = useState("");
  const [ valueInputAno, setValueInputAno ] = useState("");
  const [ valueSelectNotaFiscal, setValueSelectNotaFiscal ] = useState("");
  const [ valueInputEstoque, setValueInputEstoque ] = useState("");
  const [ valueInputEtiqueta, setValueInputEtiqueta ] = useState("");

  const [ getResponseProdutoCadastrado, setGetResponseProdutoCadastrado ] = useState(null);
  const [ responseServerIntNex, setResponseServerIntNex ] = useState(null);
  const [ statusCadastroNex, setStatusCadastroNex ] = useState(null);
  const [usuario,setUsuario] = useState();
  const [senha,setSenha] = useState();
  const [login,setLogin] = useState();

  const setDropAndGetTarget = (e, target) => {

    e.stopPropagation()

    setDropActive(true)
    
    setTarget(target)

    window.addEventListener("click", function(e){
      
      if(e.currentTarget !== targetBtn)
      {
        
        setDropActive(false)
        window.removeEventListener("click", () => {})
      }
  
    })

  }
  

  async function getListagemCadastro()
  {
    setGetResponseAddTipos(await api.get("/api/tipos"))
    setGetResponseAddModelos(await api.get("/api/modelos"))
    setGetResponseAddTamanhos(await api.get("/api/tamanhos"))
    setGetResponseAddRegioes(await api.get("/api/regiao"))
    setGetResponseAddFornecedores(await api.get("/api/fornecedores"))
  }

  async function getProdutoCadastrado()
  {

    console.log(valueResponseServer.data.produto.id,"AQUI");
    const response = await api.get(`/api/produtos/${valueResponseServer.data.produto.id}`)
    
    setGetResponseProdutoCadastrado(response)

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

  async function postProduto(e)
  {

    e.preventDefault()

    const data = {
      nome: valueInputName,
      ano:valueInputAno,
      descricao:valueInputEtiqueta,
      regiaoId: Number(valueSelectRegiao),
      tamanhoId:Number(valueSelectTamanho),
      tipoId:Number(valueSelectTipo),
      modeloId: Number(valueSelectModelo),
      fornecedorId:Number(valueSelectFornecedor),
      comNota: valueSelectNotaFiscal,
      estoque: valueInputEstoque,
      precoVenda: parseFloat(valueInputVenda.slice(3).replace(",", ".")), 
      precoCusto: parseFloat(valueInputCusto.slice(3).replace(",", "."))
    }

    try {
      const response = await api.post("/api/produtos", data)
      console.log(response,"[response]");
      setValueResponseServer(response)
      setResponseServerIntNex(response)

    } catch (error) {
      setValueResponseServer(error)
    }

    setValueInputAno("")
    setValueInputCusto("")
    setValueInputEstoque("")
    setValueInputEtiqueta("")
    setValueInputName("")
    setValueInputVenda("")
    
  }

  
  useEffect(() => {
    getListagemCadastro()
  },[comunicacaoAddModais])

 useEffect(()=>{
  getUser();
    
 },[])
 console.log(valueResponseServer);

  useEffect(()=>{
  },[dropActive, modalActiveCadastro, modalActiveDesativar])

  useEffect(() => {
    
    // Criar array de objs de retorno das requisições para carregamento de varias modais
    async function setValueResponseServerAndReset()
    {
      console.log(valueResponseServer,"[USE EFECT]")
      if(valueResponseServer !== null)
      {
        console.log(valueResponseServer,"[USE EFECT 2]")
        setTimeout(() => 
        { 
          setValueResponseServer(null) 
        }
          , 6000)
      }
      getListagemCadastro()

    }

    setValueResponseServerAndReset()

  },[valueResponseServer])

  useEffect(() =>{

    async function setValueResponseIntNex()
    {
      if(responseServerIntNex !== null)
      {
        await getProdutoCadastrado()
        setResponseServerIntNex(null)
      }
    }

    setValueResponseIntNex()

  },[responseServerIntNex])

console.log(valueResponseServer,"[REPONSE SUCESS]")

  useEffect(()=>{
    if(getResponseProdutoCadastrado !== null)
    { 
      if(usuario != null && typeof usuario != "undefined"){
        getResponseProdutoCadastrado.senha = senha
        getResponseProdutoCadastrado.login = login
        const newObj = JSON.stringify(getResponseProdutoCadastrado)     
        const responseNex = ipcRenderer.sendSync('getprodutoData', newObj)      
        setStatusCadastroNex(responseNex)
        ipcRenderer.send("minimizar-janela")
        ipcRenderer.send("maximiza-janela")

      }else{
        setStatusCadastroNex("Necessario ter usuario cadastrado no sistema, para fazer envio ao NEX.")
      }
      

    }
  },[getResponseProdutoCadastrado])

  useEffect(() => {

    if(statusCadastroNex !== null)
    {
      alert(statusCadastroNex)
      ipcRenderer.send('minimizar-janela');
      ipcRenderer.send('maximiza-janela');
    }

  },[statusCadastroNex])
  
  return(
    
    <Container>

      { modalActiveCadastro ?

        <ModalCadastroInfosProduto closeModal={setModalActiveCadastro} target={idTargetActiveModal} setResponse={setValueResponseServer} setComunicacao = {setComunicacaoAddModais}/>

        :

        ""
      }

      { modalActiveDesativar ?

        <ModalEdicaoInfosProduto closeModal={setModalActiveEditar} target={idTargetActiveModal} setResponse={setValueResponseServer} setComunicacao = {setComunicacaoAddModais}/>

        :

        ""
      }

      {
        valueResponseServer ?

        <ModalResponseServer sucess={ valueResponseServer.response ? valueResponseServer.response.data.sucess : valueResponseServer.data.sucess } message={valueResponseServer.response ? valueResponseServer.response.data.message : valueResponseServer.data.message} setComunicacao = {setComunicacaoAddModais}/>

        :

        ""
        
      }

      <Header title={<h1>Produto</h1>} img={iconProdutoAdd}>

      </Header>

      <Navigation dropDown = {setDropAndGetTarget} />

      {dropActive 
      ?
        <DropDownMenu/>
      :    
        ""
      }
      

      <main>

        <form id="add">

          <fieldset>

            <div className="wrappedTitleform">

              <h2>Adicionar novo produto</h2>

              <img src={iconAdd}></img>

            </div>

            <div className="wrappedInfosProduto">

              <div className="wrappedWraInputs">

                <div className="wrappedInput">

                  <div className="wrappedLabelInput">

                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" form="add" value={valueInputName} onChange={(e) => setValueInputName(e.currentTarget.value)} required></input>

                  </div>

                    <div className="wrappedLabelInput">

                      <div className="addInfos">

                        <button type="button" className="btnAddInfos" id="tipo" onClick={(e) => {setModalActiveCadastro(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>  
                          <IoMdAddCircleOutline/>
                        </button>

                        <button type="button" className="btnSetDesativar" id="tipo" onClick={(e) => {setModalActiveEditar(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>
                          <BiEditAlt/>
                        </button>

                       

                        <label htmlFor="tipo">Tipo</label>

                      </div>

                      <select name="tipo" id="tipo" form="add" required value={valueSelectTipo} onChange={(e) => setValueSelectTipo(e.currentTarget.value)}>  

                        <option selected id="selecione" value={"selecione"} style={{color: "#ef7f00" }}>
                          Selecione
                        </option>

                        {
                          getResponseAddTipos ?
                          
                          getResponseAddTipos.data.tipos.map((tipo) => (

                            <option key={tipo.id} value={tipo.id} disabled = {!tipo.ativo}>
                              {tipo.nome}
                            </option>

                          ))

                          :
                          ''
                          
                        }

                      </select>

                    </div>

                    <div className="wrappedLabelInput">

                      <div className="addInfos">

                        <button type="button" className="btnAddInfos" id="modelo" onClick={(e) => {setModalActiveCadastro(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>  
                          <IoMdAddCircleOutline/>
                        </button>

                        <button type="button" className="btnSetDesativar" id="modelo" onClick={(e) => {setModalActiveEditar(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>
                          <BiEditAlt/>
                        </button>

                        

                        <label htmlFor="modelo">Modelo</label>

                      </div>

                      <select name="modelo" id="modelo" form="add" value={valueSelectModelo} onChange={(e) => setValueSelectModelo(e.currentTarget.value)}>

                      <option selected id="selecione" value={"selecione"} style={{color: "#ef7f00" }}>
                        Selecione
                      </option>    

                      {
                          getResponseAddModelos ?
                          
                          getResponseAddModelos.data.modelos.map((tipo) => (

                            <option key={tipo.id} value={tipo.id} disabled = {!tipo.ativo}>
                              {tipo.nome}
                            </option>

                          ))

                          :
                          ''
                          
                        }

                      </select>

                    </div>

                </div>

                <div className="wrappedInput">

                    <div className="wrappedLabelInput">

                      <div className="addInfos">

                        <button type="button" className="btnAddInfos" id="tamanho" onClick={(e) => {setModalActiveCadastro(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>  
                          <IoMdAddCircleOutline/>
                        </button>

                        <button type="button" className="btnSetDesativar" id="tamanho" onClick={(e) => {setModalActiveEditar(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>
                          <BiEditAlt/>
                        </button>

                        <label htmlFor="tamanho">Tamanho</label>

                      </div>

                      <select name="tamanho" id="tamanho" form="add" value={valueSelectTamanho} onChange={(e) => setValueSelectTamanho(e.currentTarget.value)}>

                      <option selected id="selecione" value={"selecione"} style={{color: "#ef7f00" }}>
                        Selecione
                      </option>

                      {
                          getResponseAddTamanhos ?
                          
                          getResponseAddTamanhos.data.tamanhos.map((tipo) => (

                            <option key={tipo.id} value={tipo.id} disabled = {!tipo.ativo}>
                              {tipo.nome}
                            </option>

                          ))

                          :
                          ''
                          
                        }

                      </select>

                    </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="custo">Custo</label>

                    <NumericFormat 
                    decimalSeparator=","
                    decimalScale={3}
                    prefix="R$ "
                    name="custo"
                    id="custo"
                    form="add"
                    value={valueInputCusto}
                    required
                    onChange={(e) => setValueInputCusto(e.currentTarget.value)}
                    />

                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="venda">Preço de venda</label>
                    
                    <NumericFormat 
                    decimalSeparator=","
                    decimalScale={4}
                    prefix="R$ "
                    name="venda"
                    id="venda"
                    form="add"
                    value={valueInputVenda}
                    required
                    onChange={(e) => setValueInputVenda(e.currentTarget.value)}
                    />

                  </div>

                </div>

                <div className="wrappedInput">

                    <div className="wrappedLabelInput">

                      <div className="addInfos">

                        <button type="button" className="btnAddInfos" id="regiao" onClick={(e) => {setModalActiveCadastro(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>  
                          <IoMdAddCircleOutline/>
                        </button>

                        <button type="button" className="btnSetDesativar" id="regiao" onClick={(e) => {setModalActiveEditar(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>
                          <BiEditAlt/>
                        </button>

                        <label htmlFor="regiao">Região</label>

                      </div>

                      <select name="regiao" id="regiao" form="add" value={valueSelectRegiao} onChange={(e) => setValueSelectRegiao(e.currentTarget.value)}>

                      <option selected id="selecione" value={"selecione"} style={{color: "#ef7f00" }}>
                        Selecione
                      </option>

                      {
                          getResponseAddRegioes ?
                          
                          getResponseAddRegioes.data.regioes.map((tipo) => (

                            <option key={tipo.id} value={tipo.id} disabled = {!tipo.ativo}>
                              {tipo.nome}
                            </option>

                          ))

                          :
                          ''
                          
                        }

                      </select>

                    </div>

                    <div className="wrappedLabelInput">

                      <div className="addInfos">

                        <button type="button" className="btnAddInfos" id="fornecedor" onClick={(e) => {setModalActiveCadastro(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>  
                          <IoMdAddCircleOutline/>
                        </button>

                        <button type="button" className="btnSetDesativar" id="fornecedor" onClick={(e) => {setModalActiveEditar(true) 
                          setIdTargetActiveModal(e.currentTarget.id)}}>
                          <BiEditAlt/>
                        </button>                        

                        <label htmlFor="fornecedor">Fornecedor</label>

                      </div>

                      <select name="fornecedor" id="fornecedor" form="add" value={valueSelectFornecedor} onChange={(e) => setValueSelectFornecedor(e.currentTarget.value)}>

                      <option selected id="selecione" value={"selecione"} style={{color: "#ef7f00" }}>
                        Selecione
                      </option>

                      {
                          getResponseAddFornecedores ?
                          
                          getResponseAddFornecedores.data.fornecedores.map((tipo) => (

                            <option key={tipo.id} value={tipo.id} disabled = {!tipo.ativo}>
                              {tipo.nome}
                            </option>

                          ))

                          :
                          ''
                          
                        }

                      </select>

                    </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="ano">Ano</label>
                    <input type="Number" maxLength={2} name="ano" id="ano" form="add" required value={valueInputAno} onChange={(e) => setValueInputAno(e.currentTarget.value)}></input>

                  </div>

                </div>

                <div className="wrappedInput">

                  <div className="wrappedLabelInput">

                    <label htmlFor="nota">Nota fiscal</label>

                    <select id="nota" name="nota" required form="add" value={valueSelectNotaFiscal} onChange={(e) => setValueSelectNotaFiscal(e.currentTarget.value)}>

                        <option selected id="selecione" value={"selecione"} style={{color: "#ef7f00" }}>
                          Selecione
                        </option>

                        <option value={true}>
                          Com nota
                        </option>

                        <option value={false}>
                          Sem nota
                        </option>

                    </select>

                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="estoque">Estoque</label>
                    <input type="text" name="estoque" id="estoque" form="add" required value={valueInputEstoque} onChange={(e) => setValueInputEstoque(e.currentTarget.value)}></input>

                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="etiqueta">Descrição etiqueta</label>
                    <input maxLength={30} type="text" name="etiqueta" id="etiqueta" form="add" required value={valueInputEtiqueta} onChange={(e) => setValueInputEtiqueta(e.currentTarget.value)}></input>

                  </div>

                </div>

              </div>

            </div>

            <div className="wrappedBtnSave">

              <button type="submit" form="add" onClick={async (e) => {
                await postProduto(e)
                }
                }>
                Salvar
                <FiSave/>
              </button>

            </div>

          </fieldset>

        </form>

      </main>

    </Container>

  )
}