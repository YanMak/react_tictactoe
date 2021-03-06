import { useState } from 'react';

const Square = (prop) => {
 
  const onClick = () => {
    prop.onClick();      
  };

  return (
    <button className="square" onClick={onClick}>
    {/* show local {value} */}
    {prop.value}
    </button>
  )
  
};  

const Board = (prop) => {

  const renderSquare = (i) => (
  
    <Square 
      value={prop.squares[i]} 
      onClick={()=>(prop.onClick(i))}
    />    
  );
  
    return (
      <div>
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

  // game fiels squares
  const [squares, setSquares] = useState(Array(9).fill(undefined));
  const updateSquaresWithCurrentMark = (i) => {
    const squares_ = squares.slice();
    squares_[i] = currentPlayerMark();
    //alert('updateSquaresWithCurrentMark squares_ '+squares_);
    setSquares(squares_);
    //alert('updateSquaresWithCurrentMark squares '+squares); !!!: why !squares===squares_ after setSquares(squares_); 
  }

  // reactive prop 'history' and its update func
  const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
      }]);    

  const addToHistory = () => {
    let history_ = history.slice();
    history_.push({squares: squares});
    alert('addToHistory history_ '+JSON.stringify(history_));
    setHistory(history_);
    alert('addToHistory history '+JSON.stringify(history)); // same question as in 58 row. setHistory didnt make history same as history_
  }

  // reactive prop 'xIsNext' and related functions
  const [xIsNext, setXIsNext] = useState(true);
  const changePlayer = () => (setXIsNext(!xIsNext));// change X/O
  const currentPlayerMark = () => (xIsNext ? 'X' : 'O')
    
  const getWinner = () => {
    const currentHistorySlice = history[history.length-1].squares;
    return calculateWinner( currentHistorySlice );  
  }

  // actions on putting player's mark in game field
  const onClickInField = (i) =>{
    
    if (calculateWinner(history[history.length-1].squares)) {
      return;// do nothing couse game finished
    }
    //alert('bfo '+squares);
    updateSquaresWithCurrentMark(i);// setting current mark
    //alert('aft '+squares);
    changePlayer(); //changing current player
    addToHistory(squares);
  }

  const winner = getWinner();
  let status = '';
    if (winner) {
      status = '?????????????? ' + winner;
    } else {
      status = '?????????????????? ??????: ' + currentPlayerMark();
    }

  const moves = history.map((step, move) => {
      const desc = move ?
        '?????????????? ?? ???????? #' + move + ' ' + + JSON.stringify(step) :
        '?? ???????????? ????????' + JSON.stringify(step);
      return (
        <li>
          <button onClick={() => jumpToStep(move)}>{desc}</button>
        </li>
      );
  });

  const [stepNumber, setStepNumber] = useState(0);
  const jumpToStep = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
    getSquaresfromHistory(step);
  };
  const getSquaresfromHistory = (step) =>( setSquares(history[step].squares)  )

  /* pass to a child element these funcs: 
    setSquares addToHistory changePlayer currentPlayerMark getWinner
  */  

/*
  squares={squares} 
        onClick={onClickInField}
*/

  return (
  <div className="game">
    <div className="game-board">
      <Board 
        squares={squares} 
        onClick={onClickInField}
      />
    </div>
    <div className="game-info">
      <div>{status}</div>
      <div>history: {JSON.stringify(history)}</div>
      <ol>{moves}</ol>
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