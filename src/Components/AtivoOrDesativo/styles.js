import styled from "styled-components"


export const Container = styled.div`

  display: flex;
  align-items: center;
  gap: 0.8rem;

  > span
  {
    font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
  }

  > svg
  {
    width: 2rem;
    height: 2rem;
    color: white;
  }

`