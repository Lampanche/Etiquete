import { Container } from "./styles.js"

import { BiMessageSquareAdd } from "react-icons/bi"
import { HiOutlineHome } from "react-icons/hi"
import { MdList } from "react-icons/md"

import { Link } from "react-router-dom"
import LogoNex from "../../assets/icon-logonext.svg"

export function Navigation({ dropDown,dropDownNex })
{
  
  return(

    <Container>

      <ul>

        <li> <Link to="/"> <HiOutlineHome/> </Link> </li>

        <li> <button onClick={(e) => dropDown(e, e.currentTarget)}> <MdList/> </button> </li>
        <li> <Link to="/add"> <BiMessageSquareAdd/> </Link> </li>
        <li> <Link to="/usuario"><img src={LogoNex}/></Link></li>

      </ul>

    </Container>

  )
}