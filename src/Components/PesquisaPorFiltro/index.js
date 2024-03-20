import { Container } from "./styles.js";
import { BsSearch } from "react-icons/bs";

import { api } from "../../Service/api.js";
import { useEffect, useRef, useState } from "react";
import { BsFilterCircle } from "react-icons/bs";

import { TbFilterEdit } from "react-icons/tb"

export function PesquisaPorFiltro({ place, localRender, setGetResponselistInfos, setGetResponselistProdutos, modalActive, dataOutrosFiltros, setDataFiltro})
{

  const [ valueInputFiltroName, setValueInputFiltroName ] = useState("");
  const [ checked, setChecked ] = useState(null);
  const [ checkedAtivo, setCheckedAtivo] = useState(false);
  const [ checkedDesativado, setCheckedDesativado] = useState(false);
  const listTargetsStatus = useRef([]);

  async function filtro()
  {

    if(valueInputFiltroName === "" && checked === null && (localRender === "tipos" || "modelos" || "fornecedores" || "regioes"))
    {
     
      if(localRender === "tipos")
      {
        setGetResponselistInfos(await api.get("/api/tipos"))
      }

      if(localRender === "modelos")
      {
        setGetResponselistInfos(await api.get("/api/modelos"))
      }

      if(localRender === "fornecedores")
      {
        setGetResponselistInfos(await api.get("/api/fornecedores"))
      }

      if(localRender === "regioes")
      {
        setGetResponselistInfos(await api.get("/api/regiao"))
      }
      
    }

    if(localRender === "tipos")
    {

      if(valueInputFiltroName !== "" && checked !== null)
      {
        setGetResponselistInfos(await api.get(`/api/tipos?str=${valueInputFiltroName}&ativo=${checked}`))
      }

      if(valueInputFiltroName !== "" && checked === null)
      {
        setGetResponselistInfos(await api.get(`/api/tipos?str=${valueInputFiltroName}`))
      }

      if(valueInputFiltroName === "" && checked !== null)
      {
        setGetResponselistInfos(await api.get(`/api/tipos?ativo=${checked}`))
      }

    }
    
    if(localRender === "modelos")
    {

      if(valueInputFiltroName !== "" && checked !== null)
      {
        setGetResponselistInfos(await api.get(`/api/modelos?str=${valueInputFiltroName}&ativo=${checked}`))
      }

      if(valueInputFiltroName !== "" && checked === null)
      {
        setGetResponselistInfos(await api.get(`/api/modelos?str=${valueInputFiltroName}`))
      }

      if(valueInputFiltroName === "" && checked !== null)
      {
        setGetResponselistInfos(await api.get(`/api/modelos?ativo=${checked}`))
      }

    }

    if(localRender === "fornecedores")
    {

      if(valueInputFiltroName !== "" && checked !== null)
      {
        setGetResponselistInfos(await api.get(`/api/fornecedores?str=${valueInputFiltroName}&ativo=${checked}`))
      }

      if(valueInputFiltroName !== "" && checked === null)
      {
        setGetResponselistInfos(await api.get(`/api/fornecedores?str=${valueInputFiltroName}`))
      }

      if(valueInputFiltroName === "" && checked !== null)
      {
        setGetResponselistInfos(await api.get(`/api/fornecedores?ativo=${checked}`))
      }

    }

    if(localRender === "regioes")
    {

      if(valueInputFiltroName !== "" && checked !== null)
      {
        setGetResponselistInfos(await api.get(`/api/regiao?str=${valueInputFiltroName}&ativo=${checked}`))
      }

      if(valueInputFiltroName !== "" && checked === null)
      {
        setGetResponselistInfos(await api.get(`/api/regiao?str=${valueInputFiltroName}`))
      }

      if(valueInputFiltroName === "" && checked !== null)
      {
        setGetResponselistInfos(await api.get(`/api/regiao?ativo=${checked}`))
      }

    }

    if(localRender === "Produtos")
    { 

      if(valueInputFiltroName === "" && checked === null && dataOutrosFiltros === null)
      {
        setGetResponselistProdutos(await api.get("/api/produtos"))
        return
      }

      if(dataOutrosFiltros !== null)
      {
        console.log(dataOutrosFiltros.modelo, valueInputFiltroName)
        console.log(`/api/produtos?str=${valueInputFiltroName}
        &ativo=${checked}
        &modelo=${dataOutrosFiltros.modelo.length}
        &fornecedor=${dataOutrosFiltros.fornecedor.length}
        &tamanho=${dataOutrosFiltros.tamanho.length}
        &regiao=${dataOutrosFiltros.regiao.length}
        `)
        setGetResponselistProdutos(await api.get(`/api/produtos?str=${valueInputFiltroName}
        &ativo=${checked}
        &tipo=${dataOutrosFiltros.tipo}
        &modelo=${dataOutrosFiltros.modelo}
        &fornecedor=${dataOutrosFiltros.fornecedor}
        &tamanho=${dataOutrosFiltros.tamanho}
        &regiao=${dataOutrosFiltros.regiao}
        `))
        console.log("Entrei aqui!")
        return
      }

      setGetResponselistProdutos(await api.get(`/api/produtos?str=${valueInputFiltroName}&ativo=${checked}`))

    }
   
  }

  function handleClickChecked(targetId)
  { 

    listTargetsStatus.current = [...listTargetsStatus.current, targetId]

    const lastPostionArray = listTargetsStatus.current.length - 1

    const comparationLastPositionArray = lastPostionArray - 1

    if(checked !== null && listTargetsStatus.current[comparationLastPositionArray] === listTargetsStatus.current[lastPostionArray])
    {
      setChecked(null)
      return 
    }
    else if(checked !== null && listTargetsStatus.current[comparationLastPositionArray] !== listTargetsStatus.current[lastPostionArray])
    {
      if(targetId === "ativo")
      {
        setChecked(true)
        setCheckedDesativado(false)  
      }
      else if(targetId === "desativado")
      {
        setChecked(true)
        setCheckedAtivo(false)
      }
    }

    if(targetId === "ativo")
    {
      setChecked(true)
      setCheckedDesativado(false)  
    }
    else if(targetId === "desativado")
    {
      setChecked(false)
      setCheckedAtivo(false)
    }

  }

  console.log(dataOutrosFiltros)

  useEffect(() => {
    filtro()
  },[valueInputFiltroName, checked, dataOutrosFiltros])

  if(localRender === "Produtos")
  {
    return(

      <Container>
  
        <div className="wrappedInputTextFilter">
  
          <BsSearch/>
          <input type="text" value={valueInputFiltroName} placeholder={place} onChange={(e) => setValueInputFiltroName(e.currentTarget.value)}></input>
  
        </div>
  
        <div className="wrappedInputLabelFilter">
  
          <label htmlFor="ativo">Ativo</label>
          <input type="checkbox" name="ativo" id="ativo" checked={checkedAtivo} onChange={(e) => setCheckedAtivo(e.currentTarget.checked)} onClick={(e) => handleClickChecked(e.currentTarget.id)}></input>
  
        </div>
  
        <div className="wrappedInputLabelFilter">
  
          <label htmlFor="desativado">Desativado</label>
          <input type="checkbox" name="desativado" id="desativado" checked={checkedDesativado}  onChange={(e) => setCheckedDesativado(e.currentTarget.checked)} onClick={(e) => handleClickChecked(e.currentTarget.id)}>
  
          </input>
  
        </div>

        { dataOutrosFiltros ?

            <button onClick={() => setDataFiltro(null)}>
              <TbFilterEdit/>
            </button>
        
          :
            <button onClick={() => modalActive(true)}>
              <BsFilterCircle/>
            </button>
        }


      </Container>
  
    )
  }

  return(

    <Container>

      <div className="wrappedInputTextFilter">

        <BsSearch/>
        <input type="text" value={valueInputFiltroName} placeholder={place} onChange={(e) => setValueInputFiltroName(e.currentTarget.value)}></input>

      </div>

      <div className="wrappedInputLabelFilter">

        <label htmlFor="ativo">Ativo</label>
        <input type="checkbox" name="ativo" id="ativo" checked={checkedAtivo} onChange={(e) => setCheckedAtivo(e.currentTarget.checked)} onClick={(e) => handleClickChecked(e.currentTarget.id)}></input>

      </div>

      <div className="wrappedInputLabelFilter">

        <label htmlFor="desativado">Desativado</label>
        <input type="checkbox" name="desativado" id="desativado" checked={checkedDesativado}  onChange={(e) => setCheckedDesativado(e.currentTarget.checked)} onClick={(e) => handleClickChecked(e.currentTarget.id)}>

        </input>
      </div>


    </Container>

  )
}