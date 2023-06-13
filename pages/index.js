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
                                      [4,4,4,4],
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  console.log("Taste gedrückt:", pressedKey);

  if (pressedKey === "ArrowLeft"){
    slideLeft();
    setPressedKey(null)
  }else if (pressedKey === "ArrowRight"){
    slideRight();
    setPressedKey(null)
  }else if(pressedKey === "ArrowUp"){
    slideUp();
    setPressedKey(null);
  }else if(pressedKey === "ArrowDown"){
    slideDown();
    setPressedKey();
  }


  function filteredZeros(axis){
    return axis.filter(number => number !== 0)
  }


  function slide(axis){
    axis = filteredZeros(axis);
    
    //slide
    for (let i = 0; i < axis.length - 1; i++){
      // check every 2
      if(axis[i] === axis[i+1]){
        axis[i] *= 2;
        axis[i+1] = 0;
      }
    }
   
    axis = filteredZeros(axis);

    // add Zeros
    while(axis.length < 4){
      axis.push(0)
    }
    return axis;
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

  function slideRight(){
    let boardTemp = [];
    for(let r = 0; r < 4; r++){
      let row = board[r];
      row.reverse();
      row = slide(row);
      row.reverse();
      boardTemp.push(row)
    }
    setBoard(boardTemp);
  }


  function slideUp(){
    let boardTemp = [[],[],[],[]];
    
    for(let c = 0; c < 4; c++){
      let column = [board[0][c], board[1][c],board[2][c], board[3][c]];
      column = slide(column);
      console.log("column: ",column)
      boardTemp[0].push(column[0]);
      boardTemp[1].push(column[1]);
      boardTemp[2].push(column[2]);
      boardTemp[3].push(column[3]);
    }
    setBoard(boardTemp);
  }

  function slideDown(){
    let boardTemp = [[],[],[],[]];
    
    for(let c = 0; c < 4; c++){
      let column = [board[0][c], board[1][c],board[2][c], board[3][c]];
      column.reverse()
      column = slide(column);
      column.reverse();
      boardTemp[0].push(column[0]);
      boardTemp[1].push(column[1]);
      boardTemp[2].push(column[2]);
      boardTemp[3].push(column[3]);
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
