import styled from "styled-components"

export const Container = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin: 2rem auto;

  @keyframes bright
  {
    0%
    {
      filter: brightness(100%);

    }
    100%
    {
      filter: brightness(200%);
  
    }
    
  }

  > button
  {
    background: none;

    > svg
    {
      color: white;
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  
  > :nth-child(2) label
  {
    font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: green;     
  }

  > :nth-child(3) label
  {
    font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: red;
  }

  .wrappedInputTextFilter
  {

    display: flex;
    align-items: center;
    gap: 0.5rem;

    > svg
    {
      fill: ${({ theme }) => theme.COLORS.Light};
      width: 2.4rem;
      height: 2.4rem;
    }
  
    > input
    {
      width: calc(20rem + 10vw);
      background: ${({ theme }) => theme.COLORS.Cake100};
      border-radius: 1.2rem;
      border: none;
      padding: 1.2rem;
      color: ${({ theme }) => theme.COLORS.Light};
      font-family: 'Roboto', sans-serif;
    }
  
    > input:focus
    {
      outline: solid 2px ${({ theme }) => theme.COLORS.Light};
    }
  
    > input::placeholder
    {
      color: ${({ theme }) => theme.COLORS.Light};
      font-family: 'Roboto', sans-serif;
    }

  }

  .wrappedInputLabelFilter
  {
    display: flex;
    align-items: center;
    gap: 0.5rem;

  

  }


`