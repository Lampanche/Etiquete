import styled from "styled-components"

export const Container = styled.div`

  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.COLORS.Carrot100};
  padding: 2.4rem;
  border-radius: 2rem;

  .wrappedAtivoOrDesativado
  {
    width: 100%;
  }
  
  .wrapped_todas_infos_produtos
  {

    display: flex;
    align-items: center;
    gap: 1.2rem;
    justify-content: space-between;

    > button
      {
        background-color: ${({ theme }) => theme.COLORS.Tomato300};
        border-radius: 1rem;
        padding: 0.6rem 0.6rem;

        > svg
        {
          width: calc(1rem + 1vw);
          height: calc(1rem + 1vw);
        }

      }

    .wrapped_btn_wra_infos
    {

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.9rem;

    }

    .wrapped_etiqueta
    {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      max-width: 30rem;
      background-color: ${({ theme }) => theme.COLORS.Light400};
      align-items: center;
      border-radius: 1rem;
      padding: 1.2rem;

      > span
      {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
      }

      > img
      {
        max-width: 15rem;
      }

    }


  }
  
  .wrapped_todas_infos_impressao
  {

    display: flex;
    align-items: center;
    gap: 4.7rem;

    > button
      {
        display: flex;
        align-items: center;
        padding: 1.2rem;
        gap: 0.3rem;
        border-radius: 1.8rem;
        background-color: ${({ theme }) => theme.COLORS.Cake100};
        font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        color: ${({ theme }) => theme.COLORS.Light};

        > svg
        {
          width: calc(1rem + 1vw);
          height: calc(1rem + 1vw);
        }
      }
  }

  .wrapped_quant_impressao
  {
      
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;

      > div
      {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        > label
        {
          font-family: 'Roboto', sans-serif;
          font-weight: bold;
          color: ${({ theme })  => theme.COLORS.Light};
        }
      }
  }

  .wrapped_check
  {
    > label
    {
      font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
      font-family: 'Roboto', sans-serif;
    }
  }

  .wrapped_select
  {
    > label
    {
      font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
      font-family: 'Roboto', sans-serif;
    }

    > select
    {
      border-radius: 1rem;
      padding: 0.3rem;
      width: calc(8rem + 2vw);
      background-color: ${({ theme })  => theme.COLORS.Dark1000};
      color: ${({ theme })  => theme.COLORS.Light};
      font-family: 'Roboto', sans-serif;
      font-size: clamp(0.2rem, 0.2rem + 1vw, 1.6rem);
    }

  }

`

export const WrappedInfos = styled.div`

  display: flex;
  align-items: center;
  gap: 0.8rem;

  border: 2px solid ${({ theme }) => theme.COLORS.Light600};
  border-radius: 2rem;

  padding: 0.3rem 0.6rem;


  > h2
  {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: ${({ theme })  => theme.COLORS.Carrot200};
    font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
  }

  > span
  {
    font-family: 'Roboto', sans-serif;
    color: ${({ theme })  => theme.COLORS.Light};
    font-size: clamp(0.3rem, 0.3rem + 1vw, 1.6rem);
  }
  

`