import React from 'react';
import io from "socket.io-client";
//remove this line
function Square(props) {
    return (
    <div
      className={"square"}
      id={props.id}
      onClick={props.onClick}
    >
      {props.stateOfSquare &&
        <img src={`/images/${props.stateOfSquare}.png`}/>
      }
    </div>
    );
}

// Row is only used as a styling tool
function Row(props){
  return (
      <div
        className="boardRow"
        id={props.id}
      >
        {props.content}
      </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.rowID = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    this.state = {
      checkerBoard: {},
    };
    this.state.checkerBoard = this.rowID.reduce((result, element, i) => {
      result[element] = new Array(10).fill('');
      return result;
    }, {});

    // Creating the initial state of the checkerBoard
    let X = [...'ABCD'];
    let O = [...'GHIJ'];

    let fillRow = (rowLetter, filler) => {
      let rowNumber = this.rowID.indexOf(rowLetter);
      this.state.checkerBoard[rowLetter] = this.state.checkerBoard[rowLetter].map((square, columnNumber)  =>
        ((rowNumber + columnNumber) % 2 ? filler : '')
      );
    };
    X.forEach(letter => fillRow(letter, 'X'));
    O.forEach(letter => fillRow(letter, 'O'));

    console.table(this.state.checkerBoard);
  };

  render() {
    const squareNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //  Creating a new array that represents the content of each row (10 squares) :
    //  For each "letter" of rowID, replace it with  the numerical ID of each square,
    //  We map on these numerical ids, and replace them with <Square/>,
    //  Passing it an id and key referencing the row letter + square number.
    const rowContent = this.rowID.map(row => squareNumber.map(number =>(<Square
      id={row + number}
      key={row + number}
      stateOfSquare={this.state.checkerBoard[row][(number - 1)]}
    />)));

    return (
      <div className="container">
        <div className="boardGame">
          {this.rowID.map((id, index) => <Row
            id={id}
            key={id}
            content={rowContent[index]}
          />)}
        </div>
      </div>
    )
  }
}

export default Board;
