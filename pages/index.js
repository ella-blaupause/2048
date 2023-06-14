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
  const [board, setBoard] = useState([[0,0,0,0],
                                      [0,0,0,0],
                                      [0,0,0,0],
                                      [0,0,0,0]]);
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
  

  if (pressedKey === "ArrowLeft"){
    slideLeft();
    setPressedKey(null);
    setTwoOrFour();
  }else if (pressedKey === "ArrowRight"){
    slideRight();
    setPressedKey(null);
    setTwoOrFour();
  }else if (pressedKey === "ArrowUp"){
    slideUp();
    setPressedKey(null);
  }else if (pressedKey === "ArrowDown"){
    slideDown();
    setPressedKey(null);
    setTwoOrFour();
  }


  function filterZero(axis){
    return axis.filter(number => number !== 0)
  }


  function slide(axis){
    axis = filterZero(axis);
    
    //slide
    for (let i = 0; i < axis.length - 1; i++){
      // check every 2
      if(axis[i] === axis[i+1]){
        axis[i] *= 2;
        axis[i+1] = 0;
      }
    }
   
    axis = filterZero(axis);

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
      
      row.sort((a,b)=> b-a)
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

  function hasEmtyTile(){
    for(let r = 0; r < 4; r++){
      for(let c = 0; c < 4; c++){
        if (board[r][c] === 0){
          return true;
        }
        return false;
      }
    }
  }



  function setTwoOrFour(){
    if(!hasEmtyTile()){
      return;
    }

    let found = false;

    while(!found){
      let boardTemp = board
      let r = Math.floor(Math.random()*4);
      let c = Math.floor(Math.random()*4);
      
      if(boardTemp[r][c] === 0){
        boardTemp[r][c] = Math.random() > 0.5 ? 2 : 4;
        setBoard(boardTemp)
        found = true;
      }
    }
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
