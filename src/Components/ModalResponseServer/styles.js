import styled from "styled-components"


export const Container = styled.div`

  width: 35rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  position: absolute;
  right: 2rem;
  top: 10rem;
  animation: responseServerAnimation 800ms 400ms backwards;
  border: 2px solid white;

  > div
  {
    display: flex;
    align-items: center;
    gap: 1rem;

    > svg
    {
      color: ${({ theme }) => theme.COLORS.Light};
      width: 2.4rem;
      height: 2.4rem;
    }

    > span
    {
      color: ${({ theme }) => theme.COLORS.Light};
      font-family: 'Roboto', sans-serif;

    }

  }

`

