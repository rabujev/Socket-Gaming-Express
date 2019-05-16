import React from 'react';
import io from "socket.io-client";
import GameRules from "./gameRules";

function Square(props) {
    return (
    <div
      className={"square" +
        (props.highlighted ? " highlighted" : "") +
        (props.isSelected ? " isSelected" : "") +
        (props.capturable? " capturable" : "")}
      id={props.id}
      onClick={props.onClick}
      stateofsquare={props.stateOfSquare}
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
    this.rowID = [...'ABCDEFGHIJ'];
    this.side = ['blue', 'orange'];
    this.state = {
      checkerBoard: {},
      isSelected: [],
      validBlueMoves: [],
      validBlueCaptures: [],
      validOrangeMoves: [],
      validOrangeCaptures: [],
      turnToPlay: this.side[0],
    };
    //Creating the checkerBoard, an object with keys from A to J and values of 10 array elements
    this.state.checkerBoard = this.rowID.reduce((accumulator, currentValue, i) => {
      accumulator[currentValue] = new Array(10).fill('');
      return accumulator;
    }, {});

    //Creating an object that assigns a numerical value to the row rowLetter
    this.rowNumber = this.rowID.reduce((accumulator, currentValue, i) => {
      accumulator[currentValue] = i;
      return accumulator;
    }, {});

    // Creating the initial state of the checkerBoard
    let X = [...'ABCD'];
    let O = [...'GHIJ'];

    let fillRow = (rowLetter, filler) => {
      this.state.checkerBoard[rowLetter] = this.state.checkerBoard[rowLetter].map((square, columnNumber)  =>
        ((this.rowNumber[rowLetter] + columnNumber) % 2 ? filler : '')
      );
    };
    X.forEach(letter => fillRow(letter, 'X'));
    O.forEach(letter => fillRow(letter, 'O'));

    console.table(this.state.checkerBoard);

  };

  handleClick(rowLetter, number) {
    if (this.state.checkerBoard[rowLetter][number]) {

      // Determining which moves are valid
      let player = this.state.checkerBoard[rowLetter][number];
      switch(player) {
        case 'X' :
          // Legal blue moves
          let validBlueRow = this.rowID[this.rowNumber[rowLetter] + 1];
          let validBlueMoves = [];

          if(number - 1 >= 0 && !(this.state.checkerBoard[validBlueRow][number - 1])) {
            validBlueMoves.push(validBlueRow + (number - 1))
          }

          if(number + 1 < 10 && !(this.state.checkerBoard[validBlueRow][number + 1])) {
            validBlueMoves.push(validBlueRow + (number + 1))
          }


          // Legal blue Captures
          let validBlueCapturesRow = this.rowID[this.rowNumber[rowLetter] + 2];
          let validBlueCaptures = [];
          if(number - 2 >= 0 && (this.state.checkerBoard[validBlueRow][number - 1] === 'O')) {

            if(!this.state.checkerBoard[validBlueCapturesRow][number - 2]){
            validBlueCaptures.push(validBlueCapturesRow + (number - 2));
            }
          }
          if(number + 2 < 10 && (this.state.checkerBoard[validBlueRow][number + 1] === 'O')) {

            if(!this.state.checkerBoard[validBlueCapturesRow][number + 2]){
            validBlueCaptures.push(validBlueCapturesRow + (number + 2));
            }
          }

          this.setState({
            validBlueMoves: [...validBlueMoves],
            validBlueCaptures: [...validBlueCaptures]
          })

          break;
        case 'O' :
          // Legal orange Moves
          let validOrangeRow = this.rowID[this.rowNumber[rowLetter] - 1];
          let validOrangeMoves = [];

          if(number - 1 >= 0 &&!(this.state.checkerBoard[validOrangeRow][number - 1])) {
            validOrangeMoves.push(validOrangeRow + (number - 1))
          }

          if(number + 1 < 10 &&!(this.state.checkerBoard[validOrangeRow][number + 1])) {
            validOrangeMoves.push(validOrangeRow + (number + 1))
          }

          // Legal orange Captures
          let validOrangeCapturesRow = this.rowID[this.rowNumber[rowLetter] - 2];
          let validOrangeCaptures = [];
          if(number - 2 >= 0 && (this.state.checkerBoard[validOrangeRow][number - 1] === 'X')) {

            if(!this.state.checkerBoard[validOrangeCapturesRow][number - 2]){
            validOrangeCaptures.push(validOrangeCapturesRow + (number - 2));
            }
          }
          if(number + 2 < 10 && (this.state.checkerBoard[validOrangeRow][number + 1] === 'X')) {

            if(!this.state.checkerBoard[validBlueCapturesRow][number + 2]){
            validOrangeCaptures.push(validOrangeCapturesRow + (number + 2));
            }
          }
          this.setState({
            validOrangeMoves: [...validOrangeMoves],
            validOrangeCaptures: [...validOrangeCaptures]
          })
          console.log('valid Orange captures : ' + this.state.validOrangeCaptures);
          break;
      }

      this.setState ({
      isSelected : new Array(rowLetter, number),
      })

    } else {
      return this.handleEmpty(rowLetter, number);
    }

  };

  handleEmpty(rowLetter, number) {
    if (this.state.isSelected.length > 0) {
      let [selectedRow, selectedColumn] = [...this.state.isSelected];
      let checkerBoard = this.state.checkerBoard;
      console.log(this.rowNumber[rowLetter], number);

      // Make it so that you can not move pieces on orange squares
      if (!((this.rowNumber[rowLetter] + number) % 2)) {
        console.log('invalid move, that\'s a forbidden square mate!');
        return;

      }
      if (this.state.validOrangeMoves.includes(rowLetter + number) ||
          this.state.validBlueMoves.includes(rowLetter + number)) {
        checkerBoard[rowLetter][number] = checkerBoard[selectedRow][selectedColumn];
        checkerBoard[selectedRow][selectedColumn] = '';

        this.setState( {
          checkerBoard: checkerBoard,
          isSelected:[],
          validBlueMoves: [],
          validOrangeMoves: [],
          validBlueCaptures: [],
          validOrangeCaptures: []
        })
        console.table(this.state.checkerBoard);
      }
    }
  };

  render() {
    const squareNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //  Creating a new array that represents the content of each row (10 squares) :
    //  For each "letter" of rowID, replace it with  the numerical ID of each square,
    //  We map on these numerical ids, and replace them with <Square/>,
    //  Passing it an id and key referencing the row letter + square number.
    const rowContent = this.rowID.map(rowLetter => squareNumber.map(number =>(
      <Square
        id={rowLetter + number}
        key={rowLetter + number}
        stateOfSquare={this.state.checkerBoard[rowLetter][(number - 1)]}
        onClick={() => this.handleClick(rowLetter, (number - 1))}
        isSelected={this.state.isSelected.join('') === rowLetter + (number - 1) ? true : false}
        highlighted={this.state.validBlueMoves.includes(rowLetter + (number - 1)) ||
          this.state.validOrangeMoves.includes(rowLetter + (number - 1))}
        capturable={this.state.validOrangeCaptures.includes(rowLetter + (number - 1)) ||
          this.state.validBlueCaptures.includes(rowLetter + (number - 1))}
      />
    )));

    return (
      <div className="container">
        <div className="boardGame">
          {this.rowID.map((id, index) =>
            <Row
              id={id}
              key={id}
              content={rowContent[index]}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Board;
