import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


//tutorial provided function
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

//this square function component is a controlled component by Board 
function Square(props) {    
      return (
        <button className='square' onClick={props.onClick}>
        {props.value}
        </button> 
      );
    
  }

  class Board extends React.Component {
    renderSquare(i) {
      return  (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
             />// value prop will show state of square ( X,0, or null)
               // onClick  function prop will pass to Square  to be called when square is clicked
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)} 
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    //added constructor to give Game control over boards data
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
        };
    }

     //handle click assigns 'X' to square when its clicked and saves state within board component
     handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        } //if statement to ignore click if somone won a game 
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat ([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }


    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        //mapping game history 
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li>
                    <button onClick={() =>
                this.jumpTo(moves)}>{desc}</button>
                </li>
            );

        });
        
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  