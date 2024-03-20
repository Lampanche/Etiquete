import { Container } from "./styles.js";

import iconTipo from "../../assets/icons8-tipi-58.png";
import iconModelo from "../../assets/icons8-models-64.png";
import iconTamanho from "../../assets/icons8-expandir-100.png";
import iconRegiao from "../../assets/icons8-código-de-região-48.png";
import iconFornecedor from "../../assets/icons8-fornecedor-64.png";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { api } from "../../Service/api.js";
import { useEffect, useState } from "react";


export function ModalOutrosFiltros({modalActive, setDataOutrosFiltros})
{
  const [ responseListaTipos, setResponseListaTipos ] = useState(null);
  const [ responseListaModelos, setResponseListaModelos ] = useState(null);
  const [ responseListaFornecedores, setResponseListaFornecedores ] = useState(null);
  const [ responseListaTamanho, setResponseListaTamanho ] = useState(null);
  const [ responseListaRegioes, setResponseListaRegioes ] = useState(null);

  const [ filtroTipo, setFiltroTipo ] = useState({filtro: ""});
  const [ filtroModelo, setFiltroModelo ] = useState({filtro: ""})
  const [ filtroFornecedor, setFiltroFornecedor ] = useState({filtro: ""});
  const [ filtroTamanho, setFiltroTamanho ] = useState({filtro: ""});
  const [ filtroRegiao, setFiltroRegiao ] = useState({filtro: ""});

  async function getResponseListaInfos()
  {
    setResponseListaTipos(await api.get("/api/tipos"))
    setResponseListaModelos(await api.get("/api/modelos"))
    setResponseListaFornecedores(await api.get("/api/fornecedores"))
    setResponseListaTamanho(await api.get("/api/tamanhos"))
    setResponseListaRegioes(await api.get("/api/regiao"))
  }

  async function handleClickAplicar()
  { 

    if(filtroTipo.filtro === '' && filtroModelo.filtro === '' && filtroFornecedor.filtro === '' && filtroRegiao.filtro === '' && filtroTamanho.filtro === '')
    {
      setDataOutrosFiltros(null)
      return
    }

    setDataOutrosFiltros(
    {
      tipo: filtroTipo.filtro,
      modelo: filtroModelo.filtro,
      fornecedor:filtroFornecedor.filtro,
      regiao:filtroRegiao.filtro,
      tamanho:filtroTamanho.filtro
    }
    )
  }

  useEffect(()=>{
    getResponseListaInfos()
  },[])

  return (
    <Container>

      <div className="wrappedInputsOutrosFiltros">

        <div className="wrappedInputLine">

          <div className="wrappedInput">

            <div className="wrappedLabelImg">

              <img src={iconTipo}></img>
              <label htmlFor="tipo">Tipo</label>

            </div>

            <input type="text" name="tipo" id="tipo" list="listaTipo" onChange={(e) => setFiltroTipo({filtro:e.currentTarget.value})}></input>

            <datalist id="listaTipo">

              { 
                responseListaTipos 
                ?
                  responseListaTipos.data.tipos.map((tipo) => {
                    if(tipo.ativo)
                    {
                      return (<option key={tipo.id} value={tipo.nome}></option>)
                    }
                  })
                  

                :

                ""
              }

            </datalist>

          </div>

          <div className="wrappedInput">

            <div className="wrappedLabelImg">

              <img src={iconModelo}></img>
              <label htmlFor="modelo">Modelo</label>

            </div>

            <input type="text" list="listaModelo" name="modelo" id="modelo" onChange={(e) => setFiltroModelo({filtro:e.currentTarget.value})}></input>

            <datalist id="listaModelo">
              
              { 
                  responseListaModelos 
                  ?
                    responseListaModelos.data.modelos.map((modelo) => {
                      if(modelo.ativo)
                      {
                        return (<option key={modelo.id} value={modelo.nome}></option>)
                      }
                    })
                    

                  :

                  ""
                }

            </datalist>

          </div>

        </div>

        <div className="wrappedInputLine">

          <div className="wrappedInput">

            <div className="wrappedLabelImg">

              <img src={iconFornecedor}></img>
              <label htmlFor="fornecedor">Fornecedor</label>

            </div>

            <input type="text" list="listaFornecedor" name="fornecedor" id="fornecedor" onChange={(e) => setFiltroFornecedor({filtro:e.currentTarget.value})}></input>

            <datalist id="listaFornecedor">
              { 
                  responseListaFornecedores 
                  ?
                    responseListaFornecedores.data.fornecedores.map((fornecedor) => {
                      if(fornecedor.ativo)
                      {
                        return (<option key={fornecedor.id} value={fornecedor.nome}></option>)
                      }
                    })
                    
                  :

                  ""
                }
            </datalist>

          </div>

          <div className="wrappedInput">

            <div className="wrappedLabelImg">

              <img src={iconTamanho}></img>
              <label htmlFor="tamanho">Tamanho</label>

            </div>

            <input type="text" list="listaTamanho" name="tamanho" id="tamanho" onChange={(e) => setFiltroTamanho({filtro: e.currentTarget.value})}></input>

            <datalist id="listaTamanho">
              { 
                  responseListaTamanho 
                  ?
                    responseListaTamanho.data.tamanhos.map((tamanho) => {
                      if(tamanho.ativo)
                      {
                        return (<option key={tamanho.id} value={tamanho.nome}></option>)
                      }
                    })
                    

                  :

                  ""
                }
            </datalist>

          </div>

        </div>

        <div className="wrappedInputRegiao">

          <div className="wrappedAlinhamentoInputRegiao">

            <div className="wrappedLabelImg">

              <img src={iconRegiao}></img>
              <label htmlFor="regiao">Região</label>

            </div>

            <input type="text" list="listaRegiao" name="regiao" id="regiao" onChange={(e) => setFiltroRegiao({filtro: e.currentTarget.value})}></input>

            <datalist id="listaRegiao">
              { 
                  responseListaRegioes 
                  ?
                    responseListaRegioes.data.regioes.map((regiao) => {
                      if(regiao.ativo)
                      {
                        return (<option key={regiao.id} value={regiao.nome}></option>)
                      }
                    })
                    
                  :

                  ""
                }
            </datalist>

          </div>

        </div>

          <div className="wrappedBtnAplicar">
            <button type="button" onClick={() => {
              handleClickAplicar()
              modalActive(false)
              }}>
              Aplicar
            </button>
          </div>

          <button className="close" onClick={() => modalActive(false)}>
            <IoMdCloseCircleOutline/>
          </button>

      </div>

    </Container>
  )
}