import { createGlobalStyle } from "styled-components";

export const GlobalSty = createGlobalStyle`

  *
  {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }  

  :root
  {
    font-size: 62.5%;
  }

  body
  {
    background-color: ${({ theme }) => theme.COLORS.Dark700};
    font-size: 1.6rem;
  }

  button:hover
  {
    filter: brightness(0.8)
  }

  button
  {
    cursor: pointer;
    transition: filter 0.2s;
    border: none; 
  }

  a:hover
  {
    filter: brightness(0.8)
  }

  a
  {
    cursor: pointer;
    transition: filter 0.2s;
    text-decoration: none;
  }

`