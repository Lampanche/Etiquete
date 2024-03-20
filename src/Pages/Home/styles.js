import styled from "styled-components"

export const Container = styled.div`

  width: 100%;
  height: 100vh;

  @keyframes downtopHome
  {
    0%
    {
        transform: translateY(-20px);
        opacity: 0;
    }
    100%
    {
        transform: translateY(0);
        opacity: 1;
    }
  }

  
  > main
  { 
    padding-top: 20rem;
    margin: 0 auto 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

`

export const Navigation = styled.nav`

  background-color: ${({ theme }) => theme.COLORS.Dark1000};
  width: 27%;
  padding: 2.4rem;
  border-radius: 4rem;

  > ul
  {
    list-style: none;
    display: flex;
    justify-content: space-between;

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

export const DropDownMenuHome = styled.ul`

  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  animation: downtopHome 500ms 200ms backwards;

  :first-child
  {
    border-top: none;
    padding-top: 0.8rem;
  }

  :last-child
  {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  > li
  {
    list-style: none;
    width: 60%;
    padding: 0.5rem 0 0.5rem 0.5rem;
    background-color: ${({ theme }) => theme.COLORS.Dark1000};
    border: 1px solid ${({ theme }) => theme.COLORS.Light500};

    > a
    {
      font-family: 'Roboto', sans-serif;
      color: ${({ theme }) => theme.COLORS.Light};
      font-size: clamp(1rem, 1.2vw, 1.6rem);
    }

    > li:hover
    {
      background-color: aliceblue;
    }

  }

`