import styled from "styled-components"

export const Container = styled.div`
  
    position: relative;   
    display: grid;   
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    
    height: 100vh;
    display: grid;
    margin:auto;
    grid-template-areas: 
    "header header header"   
    "navigation dropdown main";
    justify-items: center;
    align-items: center;
    color:${({theme})=> theme.COLORS.Carrot100};
    grid-template-columns: max-content max-content ;
    grid-template-rows: max-content;
    
`
export const Form = styled.form`
    grid-area:main;
    width:500px;
    padding:50px;
    display:flex;
    flex-direction: column;
    gap:20px;
    border: 1px ${({theme})=> theme.COLORS.Carrot100} solid;
    border-radius:8px;`

export const GroupInput = styled.div`
    display:flex;
    flex-direction: column;
    gap:5px;
    >input{
        height: 30px;
        border-radius:8px;
        border:none;
        padding-left:6px;
        color:${({ theme }) => theme.COLORS.Light};
        background : ${({novo,theme}) => novo ? theme.COLORS.Light: theme.COLORS.Dark1000 }
    }

`
export const Button = styled.button`
    right:0;
    width:100px;
    padding:10px 10px 10px 10px;
    border-radius: 8px;
    color: ${({ theme }) => theme.COLORS.Dark1000};
    background-color:${({ theme }) => theme.COLORS.Tomato300};    
`
export const GroupButton = styled.div`
    display:flex;
    flex-direction: row;
    gap:10px;
    color:"white"
`