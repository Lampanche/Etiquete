import styled from "styled-components";


export const Container = styled.div`

  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes downtopModalOutrosFiltros
  {
    0%
    {
      transform: translateY(-400px);
      opacity: 0;
    }
    100%
    {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .wrappedInputsOutrosFiltros
  {
    position: relative;
    display: flex;
    margin-top: -15rem;
    flex-direction: column;
    gap: 1rem;
    max-width: max-content;
    padding: 2rem;
    border: 2px solid ${({ theme }) => theme.COLORS.Carrot100};
    border-radius: 1.2rem;
    background-color: ${({ theme }) => theme.COLORS.Dark1000};
    animation: downtopModalOutrosFiltros 800ms 250ms backwards;
  }

  .wrappedLabelImg
  {
    display: flex;
    gap: 0.5rem;

    >label
    {
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      color: ${({ theme }) => theme.COLORS.Carrot100};
      font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
      align-self: flex-end;
    }

    > img
    {
      width: 3rem;
      height: 3rem;
    }
  }

  .wrappedInput
  {

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    > input
    {
      background-color: ${({ theme }) => theme.COLORS.Dark700};
      color: ${({ theme }) => theme.COLORS.Light};
      border: none;
      border-radius: 1rem;
      width: calc(1rem + 15vw);
      padding: 1.2rem;
    }

    > input:focus
    {
      outline: 2px solid ${({ theme }) => theme.COLORS.Light};
    }

  }

  .wrappedInputRegiao
  {

    display: flex;
    justify-content: center;

    .wrappedAlinhamentoInputRegiao
    {

      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      > input
      {
        background-color: ${({ theme }) => theme.COLORS.Dark700};
        color: ${({ theme }) => theme.COLORS.Light};
        border: none;
        border-radius: 1rem;
        width: calc(1rem + 15vw);
        padding: 1.2rem;
      }
  
      > input:focus
      {
        outline: 2px solid ${({ theme }) => theme.COLORS.Light};
      }

    }

  }

  .wrappedInputLine
  {
    display: flex;
    gap: 2rem;
  }

  .wrappedBtnAplicar
  {

    display: flex;
    justify-content: center;

    >button
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
  }

  .close
  {
    position: absolute;
    top: -0.8rem;
    right: -1rem;
    
    background: none;
    background-color: ${({ theme }) => theme.COLORS.Tomato300};
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

      > svg
      {
        width: 2.5rem;
        height: 2.5rem;
      }
  }

`