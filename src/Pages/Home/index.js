import { Container } from "./styles.js";
import { Navigation } from "./styles.js";
import { Logo } from "../../Components/Logo";
import { DropDownMenuHome } from "./styles.js";

import { BiMessageSquareAdd } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi";
import { MdList } from "react-icons/md";
import { useEffect, useState } from "react";
import LogoNex from "../../assets/icon-logonext.svg"

import { Link } from "react-router-dom";

export function Home()
{

  const [ dropActive, setDropActive ] = useState(false)
  const [dropActiveNex,setDropActiveNex] = useState(false)
  const [ targetBtn, setTarget ] = useState(null)
  

  
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

  useEffect(()=>{
  },[dropActive])

  return(

    <Container>

      <main>

        <Logo/>

        <Navigation>

          <ul>

            <li> <Link to="/">  <HiOutlineHome/> </Link> </li>

            <li> <button onClick={(e) => setDropAndGetTarget(e, e.currentTarget)}> <MdList/> </button> </li>

            <li> <Link to="/add"> <BiMessageSquareAdd/> </Link> </li>

            <li> <Link to="/usuario" > <img src={LogoNex}/>  </Link></li>
  
          </ul>

        </Navigation>

      </main>

      { dropActive 

      ? 
      <DropDownMenuHome>

        <li> <Link to="/listagemProdutos"> Listagem de produtos </Link> </li>
        <li> <Link to="/listagemFornecedores"> Listagem de fornecedores </Link> </li>
        <li> <Link to="/listagemTipos"> Listagem de tipos </Link> </li>
        <li> <Link to="/listagemRegioes"> Listagem de regiões </Link> </li>
        <li> <Link to="/listagemModelos"> Listagem de modelos </Link> </li>

      </DropDownMenuHome> 

      : ""}
     
      


    </Container>

  )
}