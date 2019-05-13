import React from 'react';
import io from "socket.io-client";

function Square(props) {

  return (
    <button className={"square"} id={props.id}>

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
    };
    this.state.checkerBoard = this.rowID.reduce((result, element, i) => {
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
    const rowContent = this.rowID.map(row => squareNumber.map(number => (<Square id={row + number} key={row + number}/>)));

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
