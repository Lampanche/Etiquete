import styled from "styled-components"

export const Container = styled.nav`

grid-area: navigation;
align-self: center;
background-color: ${({ theme }) => theme.COLORS.Dark1000};
padding: 2rem;
border-radius: 4rem;
height: 30rem;
width: 8rem;
display: flex;
justify-content: center;

display: flex;

 > ul
 {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    > li button
    {
      background: none;
    }

    > li > a, button
    {
      > svg
      {
        color: ${({ theme }) => theme.COLORS.Carrot100};
        width: 4rem;
        height: 4rem;
      }
      > img {
        color: ${({ theme }) => theme.COLORS.Carrot100};
        width: 4rem;
        height: 4rem;
      }
    }

 }

`

