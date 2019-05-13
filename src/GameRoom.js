import React from 'react';
import io from "socket.io-client";

function Square(props) {

  return (
    <button className={"square"} id={props.id}>
    {props.stateOfSquare}
    </button>
  );
}

// Row is only used as a styling tool
function Row(props){
  return (
      <div className="boardRow" id={props.id}>
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
      // initialStateTop1: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // rows A and C ,  Can't use x and -
      // initialStateTop2: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // rows B and D
      // initialStateBot1: [0, 2, 0, 2, 0, 2, 0, 2, 0, 2], // rows H and J
      // initialStateBot2: [2, 0, 2, 0, 2, 0, 2, 0, 2, 0], // rows G and I
      // initialStateNull: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2 middle rows (E and F)
    };
    this.state.checkerBoard = this.rowID.reduce((result, element, i) => {
        // Another method (less elegant but with less code)
      // result.A = result.C = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
      // result.B = result.D = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
      // result.H = result.J = [0, 2, 0, 2, 0, 2, 0, 2, 0, 2];
      // result.G = result.I = [2, 0, 2, 0, 2, 0, 2, 0, 2, 0];
      // result.E = result.F = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      result[element] = new Array(10).fill('-');

      return result;
    }, {});

    // Creating the initial state of the checkerBoard
    for (let key in this.state.checkerBoard) {
      for (let i = 0; i < 10; i++) {
        switch (key) {
          case 'A':
          case 'C':
            if (i % 2 !== 0) {
              this.state.checkerBoard[key][i] = 'X';
            }
            break;
          case 'B':
          case 'D':
          if (i % 2 === 0) {
            this.state.checkerBoard[key][i] = 'X';
          }
            break;
          case 'G':
          case 'I':
            if (i % 2 !== 0) {
              this.state.checkerBoard[key][i] = 'O';
            }
            break;
          case 'H':
          case 'J':
          if (i % 2 === 0) {
            this.state.checkerBoard[key][i] = 'O';
          }
            break;
        }
      }
    }
    console.log(this.state.checkerBoard);
    };

  render() {
    const squareNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //  Creating a new array that represents the content of each row (10 squares) :
    //  For each "letter" of rowID, replace it with  the numerical ID of each square,
    //  We map on these numerical ids, and replace them with <Square/>,
    //  Passing it an id and key referencing the row letter + square number.
    const rowContent = this.rowID.map(row => squareNumber.map(number => (<Square id={row + number} key={row + number} stateOfSquare={this.state.checkerBoard[row][(number - 1)]}/>)));
    console.log("rowContent = " + rowContent);

    return (
      <div className="container">
        <div className="boardGame">
          {this.rowID.map((id, index) => <Row id={id} key={id} content={rowContent[index]}/>)}
        </div>
      </div>
    )
  }
}

export default Board;
