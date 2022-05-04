import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class Square extends React.Component {
    
    
    render() {
      return (
        <button 
            className="square" 
            onClick={() => this.props.onClick()} // the above button tag now keeps track and shows X's when clicked
        > 

          {this.props.value} {/* makes the X render when clicked */}
        </button>
      );
    }
  }

  class Board extends React.Component {
    //   sets boards intial state to contain array of 9 nulls to the 9 squares
      constructor(props){ 
          super(props);
          this.state={
              squares: Array(9).fill(null)
          };
      }
    renderSquare(i) {
      return  (
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
             />// value prop will show state of square ( X,0, or null)
               // onClick function prop will pass to Square  to be called when square is clicked
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
  