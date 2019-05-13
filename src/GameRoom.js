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
      //checkerBoard: {A: [o, x, -, x...]}
      checkerBoard: {},
      CheckMyAss: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',]
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
      return result;
    }, {});
    console.log(this.state.checkerBoard);
    // let tempBoard = {};
    // for(let i = 0; i < this.rowID.length; i++) {
    //   let key = this.rowID[i];
    //   let temp = [];
    //   for (let j = 0; j < 10; j++) {
    //     temp.push(j);
    //   }
    //   tempBoard[key] = temp;
    // }
    // console.log(tempBoard);
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
