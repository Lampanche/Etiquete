import styled from "styled-components";


export const Container = styled.div`

  position: relative;

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

  @keyframes responseServerAnimation
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

  > main
  {
    grid-area: main;
    justify-self: center;
    padding: 3rem;

    > button
    {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 3rem;
      border-radius: 1rem;
      background-color: ${({ theme }) => theme.COLORS.Tomato300};
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: 2rem;
      margin-top: 2rem;
    }

  }

  fieldset
  {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2.5rem;
    border-radius: 1rem;
  }

  .wrappedTitleform
  {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: max-content;

    > h2
    {
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      color: ${({ theme }) => theme.COLORS.Light};
      font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
    }

    > img
    {
      width: calc(2rem + 1vw);
      height: calc(2rem + 1vw);
    }

  }

  .wrappedInfosProduto
  {
    display: grid;
    grid-template-areas: 
    "wrappedInputs"
    ;
    justify-items: center;
    column-gap: 1.5rem;
  }

  .wrappedWraInputs
  {
    grid-area: wrappedInputs;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .wrappedInput
  {
    display: flex;
    gap: 1.2rem;
    align-items: flex-end;
  }

  .addInfos
  {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .btnAddInfos
  {
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 99%;

    > svg
    {
      width: calc(1.5rem + 1vw);
      height: calc(1.5rem + 1vw);
      color: ${({ theme }) => theme.COLORS.Mint100};
    }

  }

  .btnIntNex
  {
    background: none;

    > svg
    {
      width: calc(1.5rem + 1vw);
      height: calc(1.5rem + 1vw);
      
      > path
      {
        stroke: ${({ theme }) => theme.COLORS.Cake100};
      }

    }

  }

  .btnSetDesativar
  {
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 99%;
    
    > svg
    {
      width: calc(1.5rem + 1vw);
      height: calc(1.5rem + 1vw);
      color: ${({ theme }) => theme.COLORS.Tomato300};
    }

  }

  .wrappedLabelInput
  {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .wrappedLabelInput > label, .addInfos > label
  {
    color: ${({ theme }) => theme.COLORS.Carrot100};
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: clamp(0.5rem, 0.5rem + 1vw, 1.6rem);
    width: max-content;

  }

  .wrappedLabelInput > input, select
  {
    background-color: ${({ theme }) => theme.COLORS.Dark1000};
    color: ${({ theme }) => theme.COLORS.Light};
    border: none;
    border-radius: 1rem;
    width: calc(1rem + 15vw);
    padding: 1.2rem;
  }

  .wrappedLabelInput > select
  {
    > option:disabled
    {
      color: ${({ theme }) => theme.COLORS.Tomato300};
    }

    > option:not(:disabled)
    {
      color: ${({ theme }) => theme.COLORS.Mint200};
    }
    
  }

  .wrappedLabelInput > input:focus, .addInfos > select:focus
  {
    outline: 2px solid ${({ theme }) => theme.COLORS.Light};
  }

  .wrappedBtnSave
  {
    display: flex;
    justify-content: flex-end;
  }

  .wrappedBtnSave > button
  { 
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 3rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.COLORS.Tomato300};
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: clamp(0.5rem, 0.5rem + 1vw, 1.6rem);

  }


`