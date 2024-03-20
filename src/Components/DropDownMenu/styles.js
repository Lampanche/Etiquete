import styled from "styled-components"

export const Container = styled.ul`

  grid-area: dropdown;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: downtop 500ms 200ms backwards;
  

  > li
  {
    list-style: none;
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    background-color: ${({ theme }) => theme.COLORS.Dark1000};
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.Light500};
    border-top: 1px solid ${({ theme }) => theme.COLORS.Light500};
    border-right: 1px solid ${({ theme }) => theme.COLORS.Light500};
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;

    > a
    {
      font-family: 'Roboto', sans-serif;
      color: ${({ theme }) => theme.COLORS.Light};
      font-size: clamp(1rem, 0.7vw, 1.6rem);
    }

  }

`