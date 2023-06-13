import styled from "styled-components";
import Cell from "/components/Cell";
import Tile from "/components/Tile";
import { Fragment, useEffect, useRef, useState } from "react";

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
  const [board, setBoard] = useState([[2,2,2,2],
                                      [2,2,2,2],
                                      [8,0,0,0],
                                      [0,16,0,0]]);
  const [pressedKey, setPressedKey] = useState(null);
  const position = [];
  const numberArray=[];

  for (let row = 0; row < 4; row++){
    for (let column = 0; column < 4; column++){
      let number = board[row][column];
      
      if (number > 0){
        position.push([column, row])
        numberArray.push(number)
      }
    }
  }

 

  useEffect(() => {
    function handleKeyDown(event) {
      setPressedKey(event.key);
    }

    window.addEventListener("keydown", handleKeyDown);

    // Event-Listener entfernen, wenn das Komponenten-Unmounted wird
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  console.log("Taste gedrückt:", pressedKey);

  if (pressedKey === "ArrowLeft"){
    slideLeft();
    setPressedKey(null)
  }

  function filteredZeros(row){
    return row.filter(number => number !== 0)
  }


  function slide(row){
    row = filteredZeros(row);
    
    //slide
    for (let i = 0; i < row.length - 1; i++){
      // check every 2
      if(row[i] === row[i+1]){
        row[i] *= 2;
        row[i+1] = 0;
      }
    }
   
    row = filteredZeros(row);

    // add Zeros
    while(row.length < 4){
      row.push(0)
    }
    return row;
  }

  function slideLeft(){
    let boardTemp = [];
    for(let r = 0; r < 4; r++){
      let row = board[r];
      row = slide(row);
      boardTemp.push(row)
    }
    setBoard(boardTemp);
  }


  return (
    <StyledGameBoard>
       { [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((cell, Index)=>{
              return <Cell key={Index}/>
            })
       } 
       {position.map((p,pIndex)=>{    
                return <Tile key={pIndex} xPosition={position[pIndex][0]} yPosition={position[pIndex][1]} number={numberArray[pIndex]}/>
             })}
      
    </StyledGameBoard>
  );
}
