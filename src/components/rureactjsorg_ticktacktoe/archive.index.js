import { useState } from 'react';

const Square = ({value, process}) => {
 
  const [currentValue, setCurrentValue] = useState(value);  
  const onClick = () => {
    //return 
    //alert('cliclk' + value);
    if (currentValue === 'x'){
      setCurrentValue('0'); 
      //value = 'x';  
    }
    else {
      setCurrentValue('x');   
      //value = '0';
    };
    //setSquares(Array(9).fill(1))
    //setState({value: 'X'})
    alert(`value = ${value} currentValue=${currentValue}`);
    alert(`squares ${squares[value]}`);
    //process(Array(9).fill(10));
     
  };

  return (
    <button className="square" onClick={onClick}>
    {currentValue}
    {value}
    </button>
  )
  
};  

const Board = () => {

  const [squares, setSquares] = useState(Array(9).fill(1));    
  
  const renderSquare = (i) => (
    <Square value={squares[i]} process={setSquares} />    
  );
  /*
  <Square value={squares[i]} process={setSquares} />
  <Square value={i} process={setSquares}/>
  */

    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
);

export default Game;
//module.export = {
//    Game, Board, Square
//}