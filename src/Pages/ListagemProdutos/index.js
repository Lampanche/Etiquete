import { Container } from "./styles.js";

import { Header } from "../../Components/Header/index.js";
import { ProdutoListado } from "../../Components/ProdutoListado/index.js";
import { PesquisaPorFiltro } from "../../Components/PesquisaPorFiltro/index.js";
import { Navigation } from "../../Components/Navigation/index.js";
import { DropDownMenu } from "../../Components/DropDownMenu";
import {DropDownMenuNex} from "../../Components/DropDownMenuNex";
import { ModalOutrosFiltros } from "../../Components/ModalOutrosFiltros";

import iconProduto from "../../assets/icons8-produtos-64.png";
import { ImPrinter } from "react-icons/im";
import { BsCheckCircle } from "react-icons/bs";
import { MdOutlineCleaningServices } from "react-icons/md";

import { Impressao } from "../../configImpressao/Impressao.js";

import { api } from "../../Service/api.js";

import { useEffect, useState } from "react";

export function ListagemProdutos()
{
  const [ dataFiltroOutrosIn, setDataFiltroOutrosIn ] = useState(null);
  const [ modalOutrosFiltrosActive, setModalOutrosFiltrosActive ] = useState(false);
  const [ dropActive, setDropActive ] = useState(false);
  const [ targetBtn, setTarget ] = useState(null);

  const[dropActiveNex,setDropActiveNex] = useState(false);
  const [ targetNexBtn, setTargetNex ] = useState(null);
  
  const [ valuesSelectChecked, setValuesSelectChecked ] = useState(0);
  const [ valueConfirmBtn, setValueConfirmBtn ] = useState(false);
  
  const [ getResponseListaProdutos, setGetResponseListaProdutos ] = useState(null);
  
  const [ componenteImpressaoSelecionado, setComponenteImpressaoSelecionado ] = useState([]);
  const [ impressora, setImpressora ] = useState(null);
  const [ isConectQzTray, setIsConectQzTray ] = useState(null);

  const impressao = new Impressao();

  const getValueSelectChecked = (sChecked) => setValuesSelectChecked(prevstate => prevstate += sChecked)

  const setDropAndGetTarget = (e, target) => {

    e.stopPropagation()

    setDropActive(true)
    setDropActiveNex(false)
    setTarget(target)

    window.addEventListener("click", function(e){
      
      if(e.currentTarget !== targetBtn)
      {
        setDropActiveNex(false)
        setDropActive(false)
        window.removeEventListener("click", () => {})
      }
  
    })

  }
  const setDropAndGetTargetNex = (e, target) => {

    e.stopPropagation()

    setDropActiveNex(true)
    setDropActive(false)
    setTargetNex(target)

    window.addEventListener("click", function(e){
      
      if(e.currentTarget !== targetBtn)
      {
        setDropActiveNex(false)
        setDropActive(false)
        window.removeEventListener("click", () => {})
      }
  
    })

  }

  async function getListaProdutos()
  {
    setGetResponseListaProdutos(await api.get("/api/produtos"))
  }

  async function desconnectQzTray()
  {
    await impressao.disconnect()
    setImpressora(null)
    setIsConectQzTray(impressao.isConect()) 
  }

  function limparImpressao()
  {
    setComponenteImpressaoSelecionado(prevstate => prevstate = [])
    setValuesSelectChecked(0)
  }

  async function conectarModuloDeImpressao()
  {
    setImpressora(await impressao.conect())
    setIsConectQzTray(impressao.isConect())
  }
  

  useEffect(()=>{
  },[dropActive])

  useEffect(() =>{
  },[modalOutrosFiltrosActive])

  useEffect(()=>{
    if(valueConfirmBtn === true)
    {
      setValueConfirmBtn(false)
    }
  },[valueConfirmBtn])

  useEffect(() => {
    
    setIsConectQzTray(impressao.isConect())

  },[])
  
  return(

    <Container>

      {
        modalOutrosFiltrosActive ?

        <ModalOutrosFiltros 
        modalActive={setModalOutrosFiltrosActive}  
        setDataOutrosFiltros={setDataFiltroOutrosIn} 
        setOutrosFiltros={setGetResponseListaProdutos}
        />

        :

        ""

      }

      <Header title={<h1>Listagem de produtos</h1>} img={iconProduto}>

      </Header>

      <Navigation dropDown = {setDropAndGetTarget} dropDownNex={setDropAndGetTargetNex}/>

{dropActive 
      ?
      <DropDownMenu/>
      :    
      ""
      }
      {
      dropActiveNex ?  <DropDownMenuNex/> : ""
    }

      <div className="wrappedContentMain">

        <PesquisaPorFiltro 
        place={"Pesquise pelo nome do produto"} 
        localRender={"Produtos"} 
        setGetResponselistProdutos={setGetResponseListaProdutos} 
        modalActive={setModalOutrosFiltrosActive} 
        dataOutrosFiltros={dataFiltroOutrosIn}
        setDataFiltro={setDataFiltroOutrosIn}
        /> 

        <main>

          {
            getResponseListaProdutos ?

            getResponseListaProdutos.data.produtos.map((produto) => (

              <ProdutoListado 
              valueSelectChecked = {getValueSelectChecked} 
              clickBtnConfirmImpress={valueConfirmBtn} 
              key={produto.id} 
              title={produto.nome} 
              cod={produto.codigo} 
              id={produto.id} 
              descEtiqueta={produto.descricao}              
              ativo={produto.ativo}
              setComponenteImpressao={setComponenteImpressaoSelecionado}
              impressoraImpressaoUnit={impressora} 
              />

            ))

            :

            ""

          }
  
        </main>

          {
            isConectQzTray ?

              <div className="wrapped_impressao_em_massa">

                <span>Quantidade de impressões (<span>{valuesSelectChecked}</span>)</span>

                <button onClick={() => {

                  let error = false

                  componenteImpressaoSelecionado.forEach(obj =>  {

                    if(obj.valor == null || obj.valor == undefined || obj.valor.length == 0)
                    { 
                      error = true
                      return alert(`Verificamos inconsistência na seguinte descrição: ${obj.descricaoEtiqueta}`)
                    }
                  })

                  if(error == true)
                  {
                    return
                  }
                  else
                  {
                    impressao.impressaoEmMassa(impressora, componenteImpressaoSelecionado)
                  }

                  }}>

                  Imprimir
                  <ImPrinter/>

                </button>

                <button onClick={() => setValueConfirmBtn(true)}>

                  <span>Confirmar</span>
                  <BsCheckCircle/>

                </button>

                <button onClick={() => limparImpressao()}>

                  <span>Limpar</span>
                  <MdOutlineCleaningServices/>

                </button>
                

                <button className="btnDesconectarQzTray" onClick={() => desconnectQzTray()}>

                  <span>Desconectar</span>
                  <ImPrinter/>

                </button>

              </div>

            :

              <div className="wrapped_impressao_em_massa">

                <button className="btnConectarQzTray" onClick={() => conectarModuloDeImpressao()}>
                  <span>Conectar</span>
                  <ImPrinter/>
                </button>
              </div>
              

          }

      </div>

    </Container>

  )
}