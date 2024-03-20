import { Container } from "./styles.js";

import { GiConfirmed } from "react-icons/gi";

import { BiErrorCircle } from "react-icons/bi";

export function ModalResponseServer({sucess, message})
{

  if(sucess)
  {
    return(
  
      <Container style={{backgroundColor: "green"}}> 
  
        <div>
  
          <GiConfirmed/>
          
          <span>{message}</span>
  
        </div>
  
      </Container>
  
    )
    
  }

  if(!sucess)
  {
    return(
  
      <Container style={{backgroundColor: "red"}}>
  
        <div>
  
          <BiErrorCircle/>
          
          <span>{message}</span>
  
        </div>
  
      </Container>
  
    )
    
  }

}