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
    setSquares(squares_);
  }

  // rective prop 'history' and its update func
  const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
      }]);    

  const addToHistory = () => {
    let history_ = history.slice();
    history_.push({squares: squares});
    setHistory(history_);
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
    updateSquaresWithCurrentMark(i);// setting current mark
    changePlayer(); //changing current player
    addToHistory(squares);
  }

  const winner = getWinner();
  let status = '';
    if (winner) {
      status = 'Выиграл ' + winner;
    } else {
      status = 'Следующий ход: ' + currentPlayerMark();
    }

  const moves = history.map((step, move) => {
      const desc = move ?
        'Перейти к ходу #' + move :
        'К началу игры';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
  });

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