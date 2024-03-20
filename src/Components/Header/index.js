import { Container } from "./styles.js"
import { Logo } from "./../Logo"
import { IoCaretBack } from "react-icons/io5"

import { useNavigate } from "react-router-dom"

export function Header({ title, img })
{

  const navigate = useNavigate()

  return(

    <Container>
      
      <Logo/>

      <div>

        <button onClick={() => navigate(-1)}>

          <IoCaretBack/>
          Voltar

        </button>

       <div className="wrappedTitleHeader">

        { title }

        <img src={img} ></img>

       </div>

      </div>

    </Container>

  )
}