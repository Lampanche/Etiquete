import { Container } from "./styles.js";

import { Header } from "../../Components/Header/index.js";
import { Navigation } from "../../Components/Navigation/index.js";
import { DropDownMenu } from "../../Components/DropDownMenu";
import {DropDownMenuNex} from "../../Components/DropDownMenuNex";
import { ContentMainList } from "../../Components/ContentMainList/index.js";

import iconModelos from "../../assets/icons8-models-64.png"

import { useState, useEffect } from "react";

export function ListagemModelos()
{

  const [ dropActive, setDropActive ] = useState(false);
  const [ targetBtn, setTarget ] = useState(null);

  const[dropActiveNex,setDropActiveNex] = useState(false);
  const [ targetNexBtn, setTargetNex ] = useState(null);

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
  useEffect(()=>{
  },[dropActive])

  return(

    <Container>

      <Header title={<h1>Listagem de Modelos</h1>} img={iconModelos}>

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

      <ContentMainList setPlace={"Pesquise pelo nome do modelo"} lista={"modelos"}/>

    </Container>

  )
}