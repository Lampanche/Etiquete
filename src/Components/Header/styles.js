import styled from "styled-components"

export const Container = styled.div`

  width: 100%;
  height: 8rem;
  padding: 2.4rem 2.4rem;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.Dark1000};
  grid-area: header;

  > div
  {
    
    display: flex;
    align-items: center;
    gap: 5rem;

    > button
    {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;

      color: ${({ theme }) => theme.COLORS.Light};
      font-family: 'Roboto', sans-serif;
      font-size: clamp(1rem, 1rem + 1vw, 2.4rem);
      font-weight: bold;

      > svg
      {
        color: ${({ theme }) => theme.COLORS.Carrot100};
        width: 4.5rem;
        height: 4.5rem;
      }

    }

    .wrappedTitleHeader
    {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      > h1
      {
        color: ${({ theme }) => theme.COLORS.Light};
        font-family: 'Roboto', sans-serif;
        font-size: clamp(1rem, 1rem + 1vw, 2.4rem);
        margin: 0;
        padding: 0;
      }

      > img
      {
        width: 3rem;
        height: 3rem;
      }

    }

  }

  
`

