import styled from "styled-components";
import Cell from "/components/Cell";
import Tile from "/components/Tile";
import { Fragment, useState } from "react";

const StyledGameBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(4,20vmin);
    grid-template-rows: repeat(4, 20vmin);
    background-color: #CCC;
    gap: 2vmin;
    border: 1vmin;
    border-radius: 1vmin;
    padding: 2vmin;
    position: relative;
`

export default function HomePage() {
  const [board, setBoard] = useState([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);

  

  return (
    <StyledGameBoard>
       {[0,0,0,0].map((row, rowIndex)=> 
            [0,0,0,0].map((column, columnIndex)=>{
              return (
                <Fragment key={columnIndex}>
                  <Cell />
                  <Tile/>
                </Fragment>
                  )
            })
       )} 
      
    </StyledGameBoard>
  );
}
