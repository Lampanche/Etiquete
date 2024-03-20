import { Container } from "./styles.js"
import { Link } from "react-router-dom"

export function DropDownMenu()
{

  return(

    <Container>

      <li> <Link to="/listagemProdutos"> Listagem de produtos </Link> </li>
      <li> <Link to="/listagemFornecedores"> Listagem de fornecedores </Link> </li>
      <li> <Link to="/listagemTipos"> Listagem de tipos </Link> </li>
      <li> <Link to="/listagemRegioes"> Listagem de regiões </Link> </li>
      <li> <Link to="/listagemModelos"> Listagem de modelos </Link> </li>

    </Container>

  )
}