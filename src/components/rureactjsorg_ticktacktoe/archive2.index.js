import { useState } from 'react';

const Square = ({
  index, 
  squaresSetStateFunc, 
  squares, 
  rureactjsorg_onclick, 
  rureactjsorg_value,
  rureactjsorg_xIsNext,
  rureactjsorg_setXIsNext 
}) => {
 
  const [value, setValue] = useState(squares[index]);  

  // replace value of this square item with new value  
  const prepareNewSquares = (newValue) => {
    const newSquares = squares.slice();
    newSquares[index]= newValue;
    return newSquares; 
  }

  const onClick = () => {
    //return 
    let newVal = '';
    /*if (value === 'x'){
      newVal = '0';
    }
    else {
      newVal = 'x';
    };
    */
    if (rureactjsorg_xIsNext) {
      newVal = 'X';
    } 
    else {
      newVal = 'O';
    }
    rureactjsorg_setXIsNext(!rureactjsorg_xIsNext);
    setValue(newVal);//change square view (x/0)
    //
    // variant 1 ( save changes to 'squares' array in function described in Square
    // its workable
    //const newSquares = prepareNewSquares(newVal); //get processed copy of 'squares'
    //squaresSetStateFunc(newSquares); // call 'squares' update
    // )

    // variant 2 ( save changes to 'squares' array in function defined in board
    // also workable
    //rureactjsorg_handleClick(index, newVal);
    //rureactjsorg_onclick(index); // get processed 'squares' copy and update 'squares' with new version
    rureactjsorg_onclick(); 
    // )

     
  };

  return (
    <button className="square" onClick={onClick}>
    {/* show local {value} */}
    {rureactjsorg_value}
    </button>
  )
  
};  

const Board = ({addToHistory, history}) => {

  const [squares, setSquares] = useState(Array(9).fill(undefined));    
  const [xIsNext, setXIsNext] = useState(true);    
  //const [squares, setSquares] = useState(Array(9).fill('x'));    
  
  // variant 2. update square from function described in Board
  // then we`ll pass this function in square as rureactjsorg_onclick
  const rureactjsorg_handleClick = (i) =>{
    const squares_ = squares.slice();
    //if (calculateWinner(squares)) {
    if (calculateWinner(history[history.length-1].squares)) {
      return;
    }
    squares_[i] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    setSquares(squares_);

    addToHistory(squares_);
  }

  const renderSquare = (i) => (
    //onclick={() => rureactjsorg_handleClick(index, newVal)}
    <Square 
      index={i} 
      squares={squares} 
      squaresSetStateFunc={setSquares} 
      rureactjsorg_onclick={() => rureactjsorg_handleClick(i)}
      rureactjsorg_value = {squares[i]}
      rureactjsorg_xIsNext = {xIsNext}
      rureactjsorg_setXIsNext = {setXIsNext}
    />    
  );
  /*
  <Square value={squares[i]} process={setSquares} />
  <Square value={i} process={setSquares}/>
  */

    const winner = calculateWinner(squares);
    let status = '';
    if (!winner) {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    else {
      status = 'Winner is player ' + winner;
    }
    
    let winnerText = (calculateWinner(squares) ? 'winner is player ' + calculateWinner(squares) : '');

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

const Game = () => {

  const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
      }]);    

  const addToHistory = (squares_) => {
    let history_ = history.slice();
    history_.push({squares: squares_});
    setHistory(history_);
  }

  const [xIsNext, setXIsNext] = useState(true);
  const current = history[history.length-1].squares;
  
  const winner = calculateWinner(current);
  let status = '';
    if (winner) {
      status = 'Выиграл ' + winner;
    } else {
      status = 'Следующий ход: ';
    }

  return (
  <div className="game">
    <div className="game-board">
      <Board addToHistory={(squares_) => addToHistory(squares_) } history={history}/>
    </div>
    <div className="game-info">
      <div>{status}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
  )

}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
//module.export = {
//    Game, Board, Square
//}