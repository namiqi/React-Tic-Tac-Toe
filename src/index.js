import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Reset(props) {
  return (
    <button className="Reset" onClick={props.onClick}>
      Reset / Start
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <React.Fragment>
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <div className="status"> </div>
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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      numOfMoves: 0,
      status: null
    };
  }
  handleClick(i, status, winner) {
    const squares = this.state.squares.slice();
	console.log(winner);
    if (winner) {
      return;
    }
    if (this.state.numOfMoves === 9) {
      this.setState({ status: status });
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      numOfMoves: this.state.numOfMoves + 1
    });
  }
  resetBoard(winner) {
    this.state.squares = Array(9).fill(null);
    if (winner) {
      for (var i = 0; i < winner.length; i++) {
        document.getElementsByClassName("square")[
          winner[i]
        ].style.backgroundColor = "#FFFFFF";
      }
    }
    this.setState({
      squares: this.state.squares,
      xIsNext: true,
      numOfMoves: 0
    });

    this.setState({ status: "Next player: X" });
  }
  render() {
    const winner = calculateWinner(this.state.squares);
    const numOfMoves = this.state.numOfMoves;

    let status;
    if (winner) {
      for (var i = 0; i < winner.length; i++) {
        document.getElementsByClassName("square")[
          winner[i]
        ].style.backgroundColor = "#bcf1be";
      }
      if (this.state.xIsNext === false) {
        status = "Winner: X";
      } else status = "Winner: O";
    } else if (numOfMoves === 8 || numOfMoves === 9) {
      status = "It was a draw";
    } else if (numOfMoves === 0) {
      status = "Next player: X";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i, this.state.status,winner)}
          />
          <Reset onClick={() => this.resetBoard(winner)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}
