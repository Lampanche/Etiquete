import styled from "styled-components"


export const Container = styled.main`

  grid-area: main;

  > .wrappedList
  {
    max-height: 60rem;
    max-width: 40%;

    margin: 0 auto;

    border: 2px solid ${({ theme }) => theme.COLORS.Light500};
    border-radius: 1rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    
    scrollbar-width: .6rem;
    scrollbar-color: ${({ theme }) => theme.COLORS.Light500};

    > ul
    {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      width: 100%;

      > li
      {
        list-style: none;
        border: 1px solid ${({ theme }) => theme.COLORS.Light500};
        border-radius: 1rem;
        width: 90%;
        padding: 1.2rem;

        

        > .wrappedNameAndStatus
        {
          display:flex;
          flex-direction: column;
          gap:10px;

          > .infos
          {
            display: flex;
            flex-direction:row;
            width:100%;
            justify-content:space-between;

           .wrappedName
           {

            display: flex;
            gap: 1rem;

              > h2
            {
              margin: 0;
              padding: 0;
              font-family: 'Roboto', sans-serif;
              color: ${({ theme }) => theme.COLORS.Carrot100};
              font-size: clamp(0.5rem, 0.5rem + 1vw, 1.6rem);
            }
              > span
            {
              font-family: 'Roboto', sans-serif;
              color: ${({ theme }) => theme.COLORS.Light};
              font-size: clamp(0.5rem, 0.5rem + 1vw, 1.6rem);
            }

           }     

          }
          > .actions{            
            display:flex;
            width:100%;
            flex-direction: row ;
            justify-content: end;
           
            
            gap:10px;
            > button{
              height:4rem;
              width:4rem;
              border:none;
              border-radius: 8px;
              font-weight: bold;
              color: ${({theme})=> theme.COLORS.Dark1000};
              background-color: ${({theme})=> theme.COLORS.Tomato300};

              > svg
              {
                width: 2.3rem;
                height: 2.3rem;
              }

            }
          }
          
        } 

      }
      
    }

  }

  .wrappedNameAndStatus
  {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

    > .wrappedList::-webkit-scrollbar
      {
        width: 0.6rem;
      }

    > .wrappedList::-webkit-scrollbar-track
      {
        border-radius: 2rem;
      }

    > .wrappedList::-webkit-scrollbar-thumb
      {
        background-color: ${({ theme }) => theme.COLORS.Light500};
        border-radius: 2rem;
      }

`

