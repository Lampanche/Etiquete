import styled from "styled-components"

import { breakpoints } from "../../styles/breakpoints"

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
      font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
      margin-top: 2rem;

      > svg
      {
        width: calc(1rem + 0.3vw);
        height: calc(1rem + 0.3vw);
      }

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
      font-size: clamp(0.3rem, 1rem + 2vw, 1.6rem);
    }

    > img
    {
      width: 3rem;
      height: 3rem;
    }

  }

  .wrappedInfosProduto
  {
    display: grid;
    grid-template-areas: 
    "wrappedInputs wrappedEtiqueta"
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

  .wrappedEtiqueta
  { 
    width: max-content;
    height: max-content;
    grid-area: wrappedEtiqueta;
    align-self: flex-start;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    padding: 1rem;

    border-radius: 1rem;

    background-color: ${({ theme }) => theme.COLORS.Light400};

    > img
    {
      width: 15rem;
    }

    > span
    {
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: clamp(0.3rem, 0.3rem + 10vw, 1.6rem);
      text-align: center;
    }

  }

  .wrappedInput
  {
    display: flex;
    gap: 1.2rem;
  }

  .wrappedLabelInput
  {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .wrappedLabelInput > label
  {
    color: ${({ theme }) => theme.COLORS.Carrot100};
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
  }

  .wrappedLabelInput > input, select
  {
    background-color: ${({ theme }) => theme.COLORS.Dark1000};
    color: ${({ theme }) => theme.COLORS.Light};
    border: none;
    border-radius: 1rem;
    width: calc(1rem + 15vw);
    padding: 1.2rem;
    font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
  }

  .wrappedLabelInput > input:focus
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
    font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);

    > svg
    {
      width: calc(1rem + 0.3vw);
      height: calc(1rem + 0.3vw);
    }

  }

  @media  ${breakpoints.breakMainProduto} 
    {
      .wrappedInput
      {
        flex-direction: column;
      }

      fieldset
      {
        max-height: 55rem;
        overflow-y: auto;
        scrollbar-width: .6rem;
        scrollbar-color: ${({ theme }) => theme.COLORS.Light500};
      }

      fieldset::-webkit-scrollbar
      {
        width: 0.6rem;
      }

      fieldset::-webkit-scrollbar-track
      {
        border-radius: 2rem;
      }

      fieldset::-webkit-scrollbar-thumb
      {
        background-color: ${({ theme }) => theme.COLORS.Light500};
        border-radius: 2rem;
      }
    }


`