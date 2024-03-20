import styled from "styled-components"

export const Container = styled.div`

  > div
  {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    > span
    {
      color: ${({theme}) => theme.COLORS.Light};
      font-family: 'Roboto', sans-serif;
      font-weight: 700;
      font-size: 2.4rem;
    }

    > img
    {
      width: 2.8rem;
      height: 2.8rem;
    }

  }


`