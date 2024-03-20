import { Routes, Route } from "react-router-dom"

import { Home } from "../Pages/Home"
import { ListagemProdutos } from "../Pages/ListagemProdutos"
import { ListagemFornecedores } from "../Pages/ListagemFornecedores"
import { ListagemModelos } from "../Pages/ListagemModelos"
import { ListagemRegioes } from "../Pages/ListagemRegioes"
import { ListagemTipos } from "../Pages/ListagemTipos"
import { Produto } from "../Pages/Produto"
import { Add } from "../Pages/Add"
import {Usuario} from "../Pages/Usuario"


export function AppRoutes()
{
  return(

    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/listagemProdutos" element={<ListagemProdutos/>}></Route>
      <Route path="/listagemFornecedores" element={<ListagemFornecedores/>}></Route>
      <Route path="/listagemModelos" element={<ListagemModelos/>}></Route>
      <Route path="/listagemRegioes" element={<ListagemRegioes/>}></Route>
      <Route path="listagemTipos" element={<ListagemTipos/>}></Route>
      <Route path="/produtos/:id" element={<Produto/>}></Route>
      <Route path="/add" element={<Add/>}></Route>
      <Route path="/usuario" element={<Usuario/>}></Route>
    </Routes>
  )
}