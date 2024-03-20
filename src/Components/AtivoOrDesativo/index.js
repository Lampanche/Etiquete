import { Container } from "./styles.js";

import { GoIssueClosed } from "react-icons/go";

import { AiOutlineIssuesClose } from "react-icons/ai";

export function AtivoOrDesativado({ ativo })
{

  return(

    <Container>

      {
        ativo ?

        <span style={{color:"green"}}>Ativo</span>

        :

        <span style={{color:"red"}}>Desativado</span>
      }

      {
        ativo ?

        <GoIssueClosed/>

        :

        <AiOutlineIssuesClose/>

      }

    </Container>

  )

}