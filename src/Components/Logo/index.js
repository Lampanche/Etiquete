import { Container } from "./styles.js"
import logoEtiquete from "./../../assets/icons8-etiqueta-48.png"

export function Logo()
{
  return(

    <Container>

      <div>

        <span>Etiquete</span>

        <img src={logoEtiquete}></img>

      </div>

    </Container>

  )
}