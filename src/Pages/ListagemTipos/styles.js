import styled from "styled-components"


export const Container = styled.div`

  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas: 
  "header header header"
  "navigation dropdown main"
  ;

  grid-template-columns: max-content max-content 10fr;
  grid-template-rows: max-content;

  @keyframes downtop
  {
    0%
    {
      transform: translateX(-20px);
      opacity: 0;
    }
    100%
    {
      transform: translateX(0);
      opacity: 1;
    }
  }

  

`