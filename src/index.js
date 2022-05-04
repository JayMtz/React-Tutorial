import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//this square function component is a controlled component by Board 
function Square(props) {    
      return (
        <button className='square' onClick={props.onClick}>
        {props.value}
        </button> 
      );
    
  }

  class Board extends React.Component {
    //   sets boards intial state to contain array of 9 nulls to the 9 squares
    constructor(props){ 
          super(props);
          this.state={
              squares: Array(9).fill(null),
              xIsNext: true, //setting default turn state to 'X'
          };
    }
    //handle click assigns 'X' to square when its clicked and saves state within board component
    handleClick(i){
        const squares = this.state.squares.slice(); // slice copys squares array instead of modifying oringinal
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
      return  (
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
             />// value prop will show state of square ( X,0, or null)
               // onClick  function prop will pass to Square  to be called when square is clicked
      );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
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
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  