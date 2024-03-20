import {useState,useEffect} from "react";
import { Container,GroupInput,Form,Button,GroupButton } from "./styles.js";
import {api} from '../../Service/api.js';
import { findAllByDisplayValue } from "@testing-library/react";
import { BsFillArrowUpLeftSquareFill } from "react-icons/bs";
import { Navigation } from "../../Components/Navigation/index.js";
import { DropDownMenu } from "../../Components/DropDownMenu";
import {DropDownMenuNex} from "../../Components/DropDownMenuNex";
import LogoNex from "../../assets/icon-logonext.svg";
import {Header} from "../../Components/Header";

export function Usuario(){
    const [getUsuario,setUsuario] = useState();
    const [senha,setSenha] = useState();
    const [login,setLogin] = useState();
    const [id,setId] = useState();
    const [novo,setNovo] = useState(false);
    const [editar,setEditar] = useState(false);
    const [hide,setHide] = useState();
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

    function saveChange(){
        setEditar(true)
        setNovo(true)
    }
    function cancelar(){
     getUsuarioCadastrado();
        
    }

    async function saveUsuario(){
        console.log("user",getUsuario)
        console.log("EDITAR",editar)
        if(editar){  
            try{
                const usuario = {
                    login:login,
                    senha:senha
                }
                
                const usuarioCadastrado = await api.put("/api/users/1",usuario)
                alert("usuario atualizado com sucesso")
                getUsuarioCadastrado();
              

            }catch(error){
                alert(error.message)
            }        
           
          
        }else{
            try{
                const usuario = {
                    login:login,
                    senha:senha
                }
                const usuarioCadastrado = await api.post("/api/users",usuario);
                alert("Usuario criado com sucesso")
                getUsuarioCadastrado();
               

            }catch(error){
                alert("login ou senha invalidos")
            }
           
        }
    }

    async function getUsuarioCadastrado(){
       const usuarios = await api.get("api/users");
      console.log(usuarios.data.users.length);
       
       if( typeof usuarios.data.users  != "undefined" && usuarios.data.users.length> 0){
            console.log("teste");
            const usuario = usuarios.data.users[0]
            setUsuario(usuario);
            setSenha(usuario.senha)
            setLogin(usuario.login)
            setId(usuario.id)
            setNovo(false);
            setHide(false);
            
       }else{
            setNovo(true);
            setHide(true);
            
       }
       
    }
    useEffect(()=>{
        getUsuarioCadastrado();
    },[])
    useEffect(()=>{
       
    },[editar])
    useEffect(()=>{
       
    },[novo])
   
    
    return(

        <Container novo={novo}>
            <Header title={<h1>Usuario Nex</h1>} img={LogoNex}>               

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
            {                
            novo ?
            <>                
                <Form>
                <GroupInput >
                    <label htmlFor="login">Login</label>
                    <input  required onChange={(e)=>setLogin(e.target.value)} id="login" value={login}></input>                    
                </GroupInput>
                <GroupInput >
                    <label htmlFor="senha">Senha</label>
                    <input required type="password" onChange={(e)=>setSenha(e.target.value)} id="senha"  value={senha}></input>
                </GroupInput>
                <GroupButton>
                    <Button type="submit" onClick={()=>saveUsuario()}>Salvar</Button>
                    <Button   hidden={hide} onClick={()=>cancelar()}>Cancelar</Button>
                </GroupButton>
            </Form>
            </> 
            :
            <>
            
            <Form>
            <GroupInput >
                <label htmlFor="login">Login</label>
                <input required readOnly  onChange={(e)=>setLogin(e.target.value)} id="login" value={login}></input>                    
            </GroupInput>
            <GroupInput>
                <label htmlFor="senha">Senha</label>
                <input required type="password" readOnly  onChange={(e)=>setSenha(e.target.value)} id="senha"  value={senha}></input>
            </GroupInput>
            <Button onClick ={()=>saveChange()}>Editar</Button>
        </Form>
        </>
            }
           
             
            
                      
        </Container>
    )
}