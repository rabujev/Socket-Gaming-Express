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
      //checkerBoard: {A: [o, x, -, x...]}
      checkerBoard: {},
    };
    this.state.checkerBoard = this.rowID.reduce((result, element, i) => {
      result[element] = i;
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
