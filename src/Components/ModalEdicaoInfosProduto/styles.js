import styled from "styled-components"

export const Container = styled.div`

  width: 100%;
  height: 100vh;

  position: absolute;

  display:flex;
  align-items: center;
  justify-content: center;

  @keyframes downtopModal
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

  > .wrappedContentModal
  {
    position: relative;
    background-color: ${({ theme }) => theme.COLORS.Dark1000};
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    border-radius: 1.2rem;
    border: 2px solid ${({ theme }) => theme.COLORS.Carrot100};
    animation: downtopModal 800ms 250ms backwards;
    
  }

  .close
  {
    position: absolute;
    top: -0.6rem;
    right: -1rem;

    > button
    {
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

  }

  .title
  {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    > h3
    {
      color: ${({ theme }) => theme.COLORS.Light};
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: 2rem;
    }

    > img
    {
      width: 3rem;
      height: 3rem;
    }

  }

  .wrappedMain
  {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    align-items: center;
  }

  .wrappedInputModal
  {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > label
    {
      color: ${({ theme }) => theme.COLORS.Carrot100};
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: 2rem;
    }
    > select
    {
      background-color: ${({ theme }) => theme.COLORS.Dark700};
      color: ${({ theme }) => theme.COLORS.Light};
      border: none;
      border-radius: 1rem;
      width: calc(1rem + 15vw);
      padding: 1.2rem;
    }

  }

  .wrappedEdicaoNome
  {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > label
    {
      color: ${({ theme }) => theme.COLORS.Carrot100};
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: 2rem;
    }
    > input
    {
      background-color: ${({ theme }) => theme.COLORS.Dark700};
      color: ${({ theme }) => theme.COLORS.Light};
      border: none;
      border-radius: 1rem;
      width: calc(1rem + 15vw);
      padding: 1.2rem;
    }

  }

  .wrappedEdicaoStatus
  {
    display: flex;
    gap: 1rem;
    :nth-child(1)
    {
      > label
      {
        color: green;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
      }
    }

    :nth-child(2)
    {
      > label
      {
        color: red;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
      }
    }
  }

  .wrappedInputsAeDEdicao
  {
    display: flex;
    align-items: center;
    gap: 1rem;

  }

  .btnWrappedModal
  {
    > button
    {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      border-radius: 1rem;
      background-color: ${({ theme }) => theme.COLORS.Tomato300};
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: 1.8rem;
    }
  }

`