import { Container } from "./styles.js";

import { WrappedInfos } from "./styles.js";
import { BsSearch } from "react-icons/bs";
import { ImPrinter } from "react-icons/im";
import { BiEdit,BiAddToQueue } from "react-icons/bi";

import { useEffect, useRef, useState } from "react";

import { Impressao } from "../../configImpressao/Impressao.js";

import { useNavigate } from "react-router-dom";

import { AtivoOrDesativado } from "../AtivoOrDesativo";
import { GrIntegration } from "react-icons/gr";

import { api } from "../../Service/api.js";

import Barcode from 'react-barcode';

const { ipcRenderer } = window.require("electron");

export function ProdutoListado({ valueSelectChecked, clickBtnConfirmImpress, id, title, cod, descEtiqueta, ativo, setComponenteImpressao, impressoraImpressaoUnit})
{
  const [ imgCodBarValues, setImgCodBarValue ] = useState("");
  const [ checked, setChecked ] = useState(false);
  const [ select, setSelect ] = useState(1);
  const [ selectChecked, setSelectChecked ] = useState(0);

  const [usuario,setUsuario] = useState();
  const [senha,setSenha] = useState();
  const [login,setLogin] = useState(); 

  const impressao = new Impressao();

  const navigate = useNavigate();

  function setValor()
  {
    const str = new String(descEtiqueta)
    const indexR = str.indexOf("$") - 1

    if(indexR < 0)
    {
      return(
        {
          valor: null,
          desc: null
        }
      )
      
    }
    else
    {
      const valueProduto = str.slice(indexR)
      const valueDesc = str.slice(0, indexR)
      return ({
        valor: valueProduto,
        desc: valueDesc
      })

    }
  }

  function inputChecked(target)
  {

    setChecked(target.checked)
    
  }

  function valorSelect(target)
  {
    console.log(target.value)

    setSelect(target.value)
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

  async function reenviarEdicaoIntNexProduto()
  {

    let cadastroNex

    if(usuario != null && typeof usuario != "undefined" && usuario != "" && usuario.login != null && usuario.login != "" && usuario.senha != null && usuario.senha != "" )
    {
      try {
        const responseProduto = await api.get(`/api/produtos/${id}`)
        
        const produtoEdit = {
          nome: responseProduto.data.produto.nome,
          ano: responseProduto.data.produto.ano,
          tamanho: responseProduto.data.produto.tamanho.nome,
          tipo: responseProduto.data.produto.tipo.nome,
          modelo: responseProduto.data.produto.modelo.nome,
          fornecedor: responseProduto.data.produto.fornecedor.nome,
          precoVenda: responseProduto.data.produto.precoVenda,
          precoCusto: responseProduto.data.produto.precoCusto,
          codigo: responseProduto.data.produto.codigo,
          codigoAnterior:responseProduto.data.produto.codigoAnterior,
          senha: senha,
          login: login,
          reenvioedicao : true
        } 
      

        const strObj = JSON.stringify(produtoEdit)

        cadastroNex = ipcRenderer.sendSync('getProdutoEditData', strObj)

        alert(cadastroNex)
        ipcRenderer.send('minimizar-janela');
        ipcRenderer.send('maximiza-janela');
      } 
      catch (error) 
      {
        cadastroNex = "Ocorreu um erro, Não foi possível cadastrar."
        alert(cadastroNex)
        ipcRenderer.send('minimizar-janela');
        ipcRenderer.send('maximiza-janela');
      }

    }
    else
    {
      cadastroNex = "E necessario ter usuario cadastrado para a edição ser enviado ao nex."
      alert(cadastroNex)
      ipcRenderer.send('minimizar-janela');
      ipcRenderer.send('maximiza-janela');
    }

  }

  async function reenviarIntNexProduto()
  {

    let cadastroNex

    if(usuario != null && typeof usuario != "undefined" && usuario != "" && usuario.login != null && usuario.login != "" && usuario.senha != null && usuario.senha != "" )
    {
      try {
        const responseProduto = await api.get(`/api/produtos/${id}`)
        responseProduto.senha = senha
        responseProduto.login = login

        const strObj = JSON.stringify(responseProduto)

        cadastroNex = ipcRenderer.sendSync('getprodutoData', strObj)

        alert(cadastroNex)
        ipcRenderer.send('minimizar-janela');
        ipcRenderer.send('maximiza-janela');
      } 
      catch (error) 
      {
        cadastroNex = "Ocorreu um erro, Não foi possível cadastrar."
        alert(cadastroNex)
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

    setSelect(select)

    if(checked)
    {
      setSelectChecked(Number(select))
    }
    
  },[select])

  useEffect(()=>{

    if(checked)
    {
      setSelectChecked(select)
    }

  },[checked])

  useEffect(() =>{

    if(clickBtnConfirmImpress === true && checked == true)
    {
      valueSelectChecked(Number(selectChecked))
      const str = new String(descEtiqueta)
      const indexR = str.indexOf('$')

      if(indexR < 0)
      {

        setComponenteImpressao(prevstate => prevstate = [...prevstate, {
          descricaoEtiqueta: descEtiqueta,
          codigoDeBarras: cod,
          valor: null,
          quantidade: selectChecked
        }])

        return
        
      }
      else
      {
        const valueProduto = str.slice(indexR)
        const valueDesc = str.slice(0, indexR)
  
        setComponenteImpressao(prevstate => prevstate = [...prevstate, {
          descricaoEtiqueta: valueDesc,
          codigoDeBarras: cod,
          valor: valueProduto,
          quantidade: selectChecked
        }])

      }

    }
    
  },[clickBtnConfirmImpress])

  useEffect(()=>{
    getUser()
  },[])

  if(ativo)
  {
    return(
  
      <Container>
  
        <div className="wrappedAtivoOrDesativado">
          <AtivoOrDesativado ativo={ativo}/>
        </div>
  
        <div className="wrapped_todas_infos_produtos">
  
          <button onClick={() => navigate(`/produtos/${String(id)}`)}>
            <BsSearch/>
          </button>

          <button title="reenvio cadastro produto nex" type="button" onClick={() => reenviarIntNexProduto()} >
            <BiAddToQueue/>
          </button>

          <button title="reenvio edição nex" type="button" onClick={() => reenviarEdicaoIntNexProduto()} >
            <BiEdit/>
          </button>
  
          <div className="wrapped_btn_wra_infos">
  
            <WrappedInfos>
  
              <h2>Nome:</h2>
              <span>{title}</span>
  
            </WrappedInfos>
  
            <WrappedInfos>
  
              <h2>Código:</h2>
              <span>{cod}</span>
  
            </WrappedInfos>
  
          </div>
  
          <div className="wrapped_etiqueta">
            <span>{descEtiqueta}</span>
            <Barcode value={cod} width={1.7} height={80} background=""/>
          </div>
  
        </div>
  
        <div className="wrapped_todas_infos_impressao">
  
          <div className="wrapped_quant_impressao">
  
            <div className="wrapped_check">
  
              <label htmlFor="selecao_para_impressao_em_massa">Seleção para impressão em massa</label>
  
              <input type="checkbox" name="selecao_para_impressao_em_massa" id="selecao_para_impressao_em_massa" onChange = {(e) => inputChecked(e.target)}></input>
  
            </div>
  
            <div className="wrapped_select">
  
              <label htmlFor="quantidade_impressao">Selecione a quantidade de impressões
              </label>
  
              <select id="quantidade_impressao" name="quantidade_impressao" onChange={(e) => valorSelect(e.target)}>
  
                <option value="1" selected>
                  1
                </option>
  
                <option value="2">
                  2
                </option>
  
                <option value="3">
                  3
                </option>
  
                <option value="4">
                  4
                </option>
  
                <option value="5">
                  5
                </option>
  
                <option value="6">
                  6
                </option>
  
                <option value="7">
                  7
                </option>
  
                <option value="8">
                  8
                </option>
  
                <option value="9">
                  9
                </option>
  
                <option value="10">
                  10
                </option>
  
              </select>
  
            </div>
  
          </div>
  
          <button onClick={() => {
            const objSet = setValor()
            console.log(objSet)
            if(objSet.desc == null || objSet.desc == undefined || objSet.desc.length == 0 || objSet.valor == null || objSet.valor == undefined || objSet.valor.length == 0)
            {
              return alert("Verifique a descrição da etiqueta!")
            }
            else
            {
              impressao.impressaoUnitaria(select, impressoraImpressaoUnit, cod, objSet.desc, objSet.valor)
            }
            }  
            }
            >
            <span>Imprimir</span>
            <ImPrinter/>
          </button>
  
        </div>
  
      </Container>
  
    )
  }
  else if(!ativo)
  {
    return(
  
      <Container>
  
        <div className="wrappedAtivoOrDesativado">
          <AtivoOrDesativado ativo={ativo}/>
        </div>
  
        <div className="wrapped_todas_infos_produtos">
  
          <button onClick={() => navigate(`/produtos/${String(id)}`)}>
            <BsSearch/>
          </button>
  
          <div className="wrapped_btn_wra_infos">
  
            <WrappedInfos>
  
              <h2>Nome:</h2>
              <span>{title}</span>
  
            </WrappedInfos>
  
            <WrappedInfos>
  
              <h2>Código:</h2>
              <span>{cod}</span>
  
            </WrappedInfos>
  
          </div>
  
          <div className="wrapped_etiqueta">
            <span>{descEtiqueta}</span>
            <img src={imgCodBarValues}></img>
          </div>
  
        </div>
  
      </Container>
  
    )
  }

}