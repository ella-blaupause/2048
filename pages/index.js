import styled from "styled-components";
import Cell from "/components/Cell";
import Tile from "/components/Tile";
import { Fragment, useRef, useState } from "react";

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
  const [board, setBoard] = useState([[0,2,0,0],[0,2,0,0],[0,0,2,0],[0,0,0,0]]);
  const position = [];

  for (let row = 0; row < 4; row++){
    for (let column = 0; column < 4; column++){
      let number = board[row][column];
      if (number > 0){
        position.push([column, row])
      }
    }
  }

  console.log(position)

  return (
    <StyledGameBoard>
       {[0,0,0,0].map((row, rowIndex)=> 
            [0,0,0,0].map((column, columnIndex)=>{
              return (
                <Fragment key={columnIndex}>
                  <Cell />
                  {position.map((p,pIndex)=>{
                    return <Tile key={pIndex} xPosition={position[pIndex][0]} yPosition={position[pIndex][1]}/>
                  })}
                  
                </Fragment>
                  )
            })
       )} 
      
    </StyledGameBoard>
  );
}
