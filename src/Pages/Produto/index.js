import { Container } from "./styles.js";


import { Header } from "../../Components/Header/index.js";
import { Navigation } from "../../Components/Navigation/index.js";
import { DropDownMenu } from "../../Components/DropDownMenu/index.js";
import { ModalResponseServer } from "../../Components/ModalResponseServer/index.js";

import { NumericFormat } from "react-number-format";

import iconProduto from "../../assets/icons8-produtos-64.png";
import { BiEdit } from "react-icons/bi";
import { FiSave } from "react-icons/fi";

import iconProdutoform from "../../assets/icons8-produtos-64.png";

import { useParams } from "react-router-dom";

import { api } from "../../Service/api.js";

import { useState, useEffect } from "react";

import Barcode from 'react-barcode';

const { ipcRenderer } = window.require("electron");

export function Produto()
{

  const [ dropActive, setDropActive ] = useState(false);
  const [ targetBtn, setTarget ] = useState(null);
  const [ activeEnable, setActiveEnable ] = useState(true);
  
  const [ responseGetProduto, setResponseGetProduto ] = useState(null);
  const [ listaTipo, setListaTipo ] = useState(null);
  const [ listaModelo, setListaModelo ] = useState(null);
  const [ listaTamanho, setListaTamanho ] = useState(null);
  const [ listaRegiao, setListaRegiao ] = useState(null);
  const [ listaFornecedor, setListaFornecedor ] = useState(null);

  const [ valueInputName, setValueInputName ] = useState("");
  const [ valueSelectTipo, setValueSelectTipo ] = useState("");
  const [ valueSelectModelo, setValueSelectModelo ] = useState("");
  const [ valueSelectTamanho, setValueSelectTamanho ] = useState("");
  const [ valueInputCusto, setValueInputCusto ] = useState("");
  const [ valueInputVenda, setValueInputVenda ] = useState("");
  const [ valueSelectRegiao, setValueSelectRegiao ] = useState("");
  const [ valueSelectFornecedor, setValueSelectFornecedor ] = useState("");
  const [ valueInputAno, setValueInputAno ] = useState("");
  const [ valueSelectNota, setValueSelectNota ] = useState(null);
  const [ valueInputEstoque, setValueInputEstoque ] = useState("");
  const [ valueInputEtiqueta, setValueInputEtiqueta ] = useState("");
  const [ valueSelectAtivoOrDesativado, setvalueSelectAtivoOrDesativado ] = useState("");
  const [usuario,setUsuario] = useState()
  const [senha,setSenha] = useState()
  const [login,setLogin] = useState()

  const [ valueResponseServer, setValueResponseServer ] = useState(null);

  const params = useParams();

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

  async function getProduto()
  { 
    setResponseGetProduto(await api.get(`/api/produtos/${params.id}`))
  }

  function attInfosObjResponseGetProduto()
  {
    setValueInputName(responseGetProduto.data.produto.nome)
    setValueSelectTipo(responseGetProduto.data.produto.tipo.id)
    setValueSelectModelo(responseGetProduto.data.produto.modelo.id)
    setValueSelectTamanho(responseGetProduto.data.produto.tamanho.id)
    setValueInputCusto(responseGetProduto.data.produto.precoCusto)
    setValueInputVenda(responseGetProduto.data.produto.precoVenda)
    setValueSelectRegiao(responseGetProduto.data.produto.regiao.id)
    setValueSelectFornecedor(responseGetProduto.data.produto.fornecedor.id)
    setValueInputAno(responseGetProduto.data.produto.ano)
    setValueSelectNota(responseGetProduto.data.produto.comNota)
    setValueInputEstoque(responseGetProduto.data.produto.estoque)
    setValueInputEtiqueta(responseGetProduto.data.produto.descricao)
    setvalueSelectAtivoOrDesativado(responseGetProduto.data.produto.ativo)

  }

  async function getProdutoInfosLista()
  {
    setListaTipo(await api.get("/api/tipos"))
    setListaModelo(await api.get("/api/modelos"))
    setListaTamanho(await api.get("/api/tamanhos"))
    setListaRegiao(await api.get("/api/regiao"))
    setListaFornecedor(await api.get("/api/fornecedores"))
  }
  
  const isSelected = (idP, idL) => {
    if(idP === idL)
    {
      return true
    }

    return false
  }

  async function sendIpcAndGetReturn(objAtt)
  { 

    const dataIpc = {
      nome:objAtt.data.produto.nome,
      ano:objAtt.data.produto.ano,
      tamanho:objAtt.data.produto.tamanho.nome,
      tipo:objAtt.data.produto.tipo.nome,
      modelo: objAtt.data.produto.modelo.nome,
      fornecedor:objAtt.data.produto.fornecedor.nome,
      precoVenda: objAtt.data.produto.precoVenda, 
      precoCusto: objAtt.data.produto.precoCusto,
      codigo: objAtt.data.produto.codigo,
      senha:senha,
      login:login
      
    }

    const strObj = JSON.stringify(dataIpc)
    if(typeof usuario == "undefined" || usuario == "" || usuario == null 
    || typeof usuario.senha == "undefined" || usuario.senha == "" || usuario.senha == null ||
    typeof usuario.login == "undefined" || usuario.login == "" || usuario.login == null){
      alert("Cadastro de usuario nex inexistente ou inválido")
      ipcRenderer.send('minimizar-janela');
      ipcRenderer.send('maximiza-janela');
    }else{
      const editNex = ipcRenderer.sendSync('getProdutoEditData', strObj)
      alert(editNex);
      ipcRenderer.send('minimizar-janela');
      ipcRenderer.send('maximiza-janela');

    }
    
  }
  
  async function editProduto(e)
  {

    e.preventDefault()

    const isStrCusto = (typeof valueInputCusto == "string")
    const isStrVenda = (typeof valueInputVenda == "string")
    console.log()
    console.log(isStrCusto)

    const data = {
      nome: valueInputName,
      ano:valueInputAno,
      descricao:valueInputEtiqueta,
      regiaoId: Number(valueSelectRegiao),
      tamanhoId:Number(valueSelectTamanho),
      tipoId:Number(valueSelectTipo),
      modeloId: Number(valueSelectModelo),
      fornecedorId:Number(valueSelectFornecedor),
      comNota: valueSelectNota,
      estoque: valueInputEstoque,
      precoVenda: isStrVenda ? parseFloat(valueInputVenda.slice(3).replace(",", ".")) :  valueInputVenda, 
      precoCusto: isStrCusto ?  parseFloat(valueInputCusto.slice(3).replace(",", ".")) : valueInputCusto,
      ativo: valueSelectAtivoOrDesativado
    }

    try {
      const responseObjAtt = await api.put(`/api/produtos/${params.id}`, data)
      setValueResponseServer(responseObjAtt)
      sendIpcAndGetReturn(responseObjAtt);
      
    } catch (error) {      
      setValueResponseServer(error)
    }

  }

  async function getUsuario(){
    const usuarios = await api.get("api/users");            
       if( typeof usuarios.data.users  != "undefined" && usuarios.data.users.length> 0){          
            const usuario = usuarios.data.users[0]
            setUsuario(usuario);
            setSenha(usuario.senha)
            setLogin(usuario.login)           
            
            
       }
  }

  useEffect(() => {
  },[dropActive])

  useEffect(() => {

  },[activeEnable])

  useEffect(() => {
    if(responseGetProduto !== null)
    {
      attInfosObjResponseGetProduto()
    }
  },[responseGetProduto])

  useEffect(() => {
    if(valueResponseServer !== null)
    {
      setTimeout(() => setValueResponseServer(null), 6000)
      getProduto()
    }
  },[valueResponseServer])

  useEffect(() => {
    getUsuario();
    getProduto()
    getProdutoInfosLista()
  },[])

  return(

    <Container>

      {
        valueResponseServer ?

        <ModalResponseServer sucess={ valueResponseServer.response ? valueResponseServer.response.data.sucess : valueResponseServer.data.sucess } message={valueResponseServer.response ? valueResponseServer.response.data.message : valueResponseServer.data.message}/>

        :

        ""
        
      }

      <Header title={<h1>Produto</h1>} img={iconProduto}>

      </Header>

      <Navigation dropDown = {setDropAndGetTarget}/>

      {dropActive 
      ?
        <DropDownMenu/>
      :    
        ""
      }

      <main>

        <form id="detalheProduto" onSubmit={(e) => editProduto(e)}>

          <fieldset>

            <div className="wrappedTitleform">

              <h2>Produto detalhado</h2>

              <img src={iconProdutoform}></img>

            </div>

            <div className="wrappedInfosProduto">

              <div className="wrappedWraInputs">

                <div className="wrappedInput">

                  <div className="wrappedLabelInput">

                    <label htmlFor="nome">Nome</label>

                    <input 
                    type="text" 
                    name="nome" 
                    id="nome" 
                    form="detalheProduto" 
                    value={valueInputName} 
                    required 
                    disabled = {activeEnable} 
                    onChange={(e) => setValueInputName(e.currentTarget.value)}
                    ></input>

                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="tipo">Tipo</label>

                    {
                      responseGetProduto ?
                      <select 
                      name="tipo" 
                      id="tipo" 
                      form="detalheProduto" 
                      value={valueSelectTipo} 
                      required 
                      disabled = {activeEnable}
                      onChange={(e) => setValueSelectTipo(e.currentTarget.value)}
                      >

                          {
                            listaTipo ?

                            listaTipo.data.tipos.map((tipo) => (

                              <option key={tipo.id} value={tipo.id} disabled ={!tipo.ativo} selected = {isSelected()}>
                                {tipo.nome}
                              </option>

                            ))

                            :

                            ""

                          }

                      </select>

                      :

                      ""

                    }


                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="modelo">Modelo</label>

                    {
                      responseGetProduto ?

                      <select 
                      name="modelo" 
                      id="modelo" 
                      form="detalheProduto" 
                      required 
                      disabled = {activeEnable}
                      value={valueSelectModelo}
                      onChange={(e) => setValueSelectModelo(e.currentTarget.value)}
                      >

                        {
                          listaModelo ?

                          listaModelo.data.modelos.map((modelo) => (

                            <option key={modelo.id} value={modelo.id} disabled ={!modelo.ativo} selected = {isSelected()}>
                              {modelo.nome}
                            </option>

                            ))

                          :

                          ""

                        }

                      </select>

                      :

                      ""
                    }

                  </div>

                </div>

                <div className="wrappedInput">

                  <div className="wrappedLabelInput">

                    <label htmlFor="tamanho">Tamanho</label>

                    {
                      responseGetProduto ?

                      <select 
                      name="tamanho" 
                      id="tamanho" 
                      form="detalheProduto" 
                      required 
                      disabled = {activeEnable}
                      value={valueSelectTamanho}
                      onChange={(e) => setValueSelectTamanho(e.currentTarget.value)}
                      >

                        {
                          listaTamanho ?

                          listaTamanho.data.tamanhos.map((tamanho) => (

                            <option key={tamanho.id} value={tamanho.id} disabled ={!tamanho.ativo} selected = {isSelected()}>
                              {tamanho.nome}
                            </option>

                            ))

                          :

                          ""

                        }

                      </select>

                      :

                      ""

                    }


                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="custo">Custo</label>

                    <NumericFormat 
                    decimalSeparator=","
                    decimalScale={3}
                    prefix="R$ "
                    name="custo"
                    id="custo"
                    form="detalheProduto"
                    value={valueInputCusto}
                    required
                    onChange={(e) => setValueInputCusto(e.currentTarget.value)}
                    disabled = {activeEnable}
                    />
                    

                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="venda">Preço de venda</label>
                    
                    <NumericFormat 
                    decimalSeparator=","
                    decimalScale={3}
                    prefix="R$ "
                    name="venda"
                    id="venda"
                    form="detalheProduto"
                    value={valueInputVenda}
                    required
                    onChange={(e) => setValueInputVenda(e.currentTarget.value)}
                    disabled = {activeEnable}
                    />

                  </div>

                </div>

                <div className="wrappedInput">

                  <div className="wrappedLabelInput">

                    <label htmlFor="regiao">Região</label>

                    {
                      responseGetProduto ?

                      <select 
                      name="regiao" 
                      id="regiao" 
                      form="detalheProduto" 
                      required 
                      disabled = {activeEnable}
                      value={valueSelectRegiao}
                      onChange={(e) => setValueSelectRegiao(e.currentTarget.value)}
                      >

                      
                        {
                          listaRegiao ?

                          listaRegiao.data.regioes.map((regiao) => (

                            <option key={regiao.id} value={regiao.id} disabled ={!regiao.ativo} selected = {isSelected()}>
                              {regiao.nome}
                            </option>

                            ))

                          :

                          ""

                        }
                      

                      </select>

                      :

                      ""

                    }


                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="fornecedor">Fornecedor</label>

                    {
                      responseGetProduto ?

                      <select 
                      name="fornecedor" 
                      id="fornecedor" 
                      form="detalheProduto" 
                      required 
                      disabled = {activeEnable}
                      value={valueSelectFornecedor}
                      onChange={(e) => setValueSelectFornecedor(e.currentTarget.value)}
                      >

                        {
                          listaFornecedor ?

                          listaFornecedor.data.fornecedores.map((fornecedor) => (

                            <option key={fornecedor.id} value={fornecedor.id} disabled ={!fornecedor.ativo} selected = {isSelected()}>
                              {fornecedor.nome}
                            </option>

                            ))

                          :

                          ""

                        }
                      
                      </select>

                      :

                      ""

                    }


                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="ano">Ano</label>
                    <input 
                    type="Number" 
                    name="ano" 
                    id="ano" 
                    form="detalheProduto"
                    maxLength={2}
                    required 
                    disabled = {activeEnable}
                    value={valueInputAno}
                    onChange={(e) => setValueInputAno(e.currentTarget.value)}
                    ></input>

                  </div>

                </div>

                <div className="wrappedInput">

                  <div className="wrappedLabelInput">

                    <label htmlFor="nota">Nota fiscal</label>

                    {
                      responseGetProduto ?

                      <select 
                      type="text"
                      name="nota" 
                      id="nota" 
                      form="detalheProduto" 
                      required 
                      disabled = {activeEnable}
                      value={valueSelectNota}
                      onChange={(e) => setValueSelectNota(e.currentTarget.value)}
                      >

                      <option value={true} selected={responseGetProduto.data.produto.comNota}>
                        Com nota
                      </option>

                      <option value={false} selected={responseGetProduto.data.produto.comNota}>
                        Sem nota
                      </option>

                      </select>

                      :

                      ""
                    }


                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="estoque">Estoque</label>

                    <input 
                    type="text" 
                    name="estoque" 
                    id="estoque" 
                    form="detalheProduto" 
                    required 
                    disabled = {activeEnable}
                    value={valueInputEstoque}
                    onChange={(e) => setValueInputEstoque(e.currentTarget.value)}
                    >
                    </input>

                  </div>

                  <div className="wrappedLabelInput">

                    <label htmlFor="etiqueta">Descrição etiqueta</label>
                    <input 
                    type="text" 
                    name="etiqueta" 
                    id="etiqueta" 
                    form="detalheProduto"
                    maxLength={30}
                    required 
                    disabled = {activeEnable}
                    value={valueInputEtiqueta}
                    onChange={(e) => setValueInputEtiqueta(e.currentTarget.value)}
                    >

                    </input>

                  </div>

                </div>

                
                <div className="wrappedLabelInput">

                  <label htmlFor="status">Status</label>

                  {
                    responseGetProduto ?

                    <select 
                    name="status" 
                    id="status" 
                    form="detalheProduto" 
                    required 
                    disabled = {activeEnable}
                    value={valueSelectAtivoOrDesativado}
                    onChange={(e) => setvalueSelectAtivoOrDesativado(e.currentTarget.value)}
                    >
                      <option value={true} selected={console.log(responseGetProduto.data.produto.ativo)}>
                        Ativo
                      </option>

                      <option value={false} selected={!responseGetProduto.data.produto.ativo} >
                        Desativado
                      </option>

                    </select>

                    :

                    ""
                  }

                </div>


              </div>

              <div className="wrappedEtiqueta">
                
                <span>{responseGetProduto ? responseGetProduto.data.produto.descricao : ""}</span>
                <Barcode value={responseGetProduto ? responseGetProduto.data.produto.codigo : ""} width={1.7} height={80} background=""/>

              </div>

            </div>

            <div className="wrappedBtnSave">

              <button type="submit"
              onClick={() => {
              setActiveEnable(true)}}
              >
                Salvar
                <FiSave/>
              </button>

            </div>

          </fieldset>

        </form>

        {
          activeEnable ?

          <button onClick={() => setActiveEnable(false)}>
            Editar
            <BiEdit/>
          </button>

          :

          <button onClick={() => {
            setActiveEnable(true)
            attInfosObjResponseGetProduto()
            }}>
            Cancelar
            <BiEdit/>
          </button>

        }


      </main>

    </Container>
  )
}