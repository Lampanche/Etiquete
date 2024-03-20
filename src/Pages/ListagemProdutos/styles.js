import styled from "styled-components"

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

  .wrappedContentMain
  {

    grid-area: main;

    > main
    {
      max-height: 60rem;
      max-width: 70%;

      margin: 0 auto;

      border: 2px solid ${({ theme }) => theme.COLORS.Light500};
      border-radius: 1rem;
      padding: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      overflow-y: auto;
    
      scrollbar-width: .6rem;
      scrollbar-color: ${({ theme }) => theme.COLORS.Light500};

    }

    main::-webkit-scrollbar
    {
      width: 0.6rem;
    }

    main::-webkit-scrollbar-track
    {
      border-radius: 2rem;
    }

    main::-webkit-scrollbar-thumb
    {
      background-color: ${({ theme }) => theme.COLORS.Light500};
      border-radius: 2rem;
    }
  }

  .wrapped_impressao_em_massa
  {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    max-width: 70%;
    margin: 0 auto;
    padding: 1.2rem;
    
    border-radius: 1rem;
    border: 2px solid ${({ theme }) => theme.COLORS.Light500}; 

    > span
    {
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      color: ${({ theme }) => theme.COLORS.Light};
      font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);

      > span
      {
        color: ${({ theme }) => theme.COLORS.Mint200};
        font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
      }

    }

    > button
    {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
      color: ${({ theme }) => theme.COLORS.Light};
      background-color: ${({ theme }) => theme.COLORS.Cake100};
      padding: 1.2rem;
      border-radius: 1.8rem;

      > svg
      {
        width: calc(1rem + 1vw);
        height: calc(1rem + 1vw);
      }

    }

  }

`