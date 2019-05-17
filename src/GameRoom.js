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
    this.state = {
      checkerBoard: {},
      isSelected: [],
      validBlueMoves: [],
      validBlueCaptures: [],
      validOrangeMoves: [],
      validOrangeCaptures: [],
      bluesTurnToPlay: true
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

  // startOfTurn() {
  //   if (this.state.bluesTurnToPlay) {
  //       this.state.rowID.map((letter, index) =>
  //           (this.state.checkerBoard[letter].map(function(number, index) {
  //               if ((this.rowNumber[letter] + number) % 2 && (this.state.checkerBoard[letter][number] == 'X')) {
  //                   return;
  //               }
  //           }
  //           )
  //           )
  //       )
  //   }
  // };

  handleClick(rowLetter, number, isBlueTurn) {
// this.startOfTurn();
    if (this.state.checkerBoard[rowLetter][number]) {
        if(this.state.validOrangeCaptures.length < 1 && this.state.validBlueCaptures.length < 1) {

          this.validMoves(rowLetter, number, isBlueTurn);

          this.setState ({
          isSelected : new Array(rowLetter, number),
          })
        }
    } else {
      return this.handleEmpty(rowLetter, number);
    }

  };

  validMoves(rowLetter, number, isBlueTurn) {
        let player = this.state.checkerBoard[rowLetter][number];

        if (isBlueTurn && player === 'X')  {
            let validBlueRow = this.rowID[this.rowNumber[rowLetter] + 1]; // jam : only forward
            let validBlueRowBackwards = this.rowID[this.rowNumber[rowLetter] - 1]; //backwards

            let validBlueMoves = [];

            if(number - 1 >= 0 && !(this.state.checkerBoard[validBlueRow][number - 1])) {
                validBlueMoves.push(validBlueRow + (number - 1))
            }

            if(number + 1 < 10 && !(this.state.checkerBoard[validBlueRow][number + 1])) {
                validBlueMoves.push(validBlueRow + (number + 1))
            }

              // Legal blue Captures
            let validBlueCapturesRow = this.rowID[this.rowNumber[rowLetter] + 2]; // jam : only forward, this is a letter
            let validBlueCapturesRowBackwards = this.rowID[this.rowNumber[rowLetter] - 2]; // backwards row, Landing spot
            let validBlueCaptures = [];
            if(number - 2 >= 0 && (this.state.checkerBoard[validBlueRow][number - 1] === 'O')) {

                if(!this.state.checkerBoard[validBlueCapturesRow][number - 2]){
                    validBlueCaptures.push(validBlueCapturesRow + (number - 2));
                }
            }
            if(number - 2 >= 0 && (this.state.checkerBoard[validBlueRowBackwards][number - 1] === 'O')) { //backwards too

                if(!this.state.checkerBoard[validBlueCapturesRowBackwards][number - 2]){
                    validBlueCaptures.push(validBlueCapturesRowBackwards + (number - 2));
                }
            }

            if(number + 2 < 10 && (this.state.checkerBoard[validBlueRow][number + 1] === 'O')) {

                if(!this.state.checkerBoard[validBlueCapturesRow][number + 2]){
                    validBlueCaptures.push(validBlueCapturesRow + (number + 2));
                }
            }
            if(number + 2 < 10 && (this.state.checkerBoard[validBlueRowBackwards][number + 1] === 'O')) {//backwards too

                if(!this.state.checkerBoard[validBlueCapturesRowBackwards][number + 2]){
                    validBlueCaptures.push(validBlueCapturesRowBackwards + (number + 2));
                }
            }



            this.setState({
                validBlueMoves: [...validBlueMoves],
                validBlueCaptures: [...validBlueCaptures]
            })
        } else {
            if(!isBlueTurn && player === 'O'){
                let validOrangeRow = this.rowID[this.rowNumber[rowLetter] - 1]; // jam : only forward
                let validOrangeRowBackwards = this.rowID[this.rowNumber[rowLetter] + 1]; //backwards
                let validOrangeMoves = [];

                if(number - 1 >= 0 &&!(this.state.checkerBoard[validOrangeRow][number - 1])) {
                  validOrangeMoves.push(validOrangeRow + (number - 1))
                }

                if(number + 1 < 10 &&!(this.state.checkerBoard[validOrangeRow][number + 1])) {
                  validOrangeMoves.push(validOrangeRow + (number + 1))
                }
                // Legal orange Captures
                let validOrangeCapturesRow = this.rowID[this.rowNumber[rowLetter] - 2];
                let validOrangeCapturesRowBackwards = this.rowID[this.rowNumber[rowLetter] + 2]; // backwards row, Landing spot
                let validOrangeCaptures = [];

                if(number - 2 >= 0 && (this.state.checkerBoard[validOrangeRow][number - 1] === 'X')) {

                  if(!this.state.checkerBoard[validOrangeCapturesRow][number - 2]){
                    validOrangeCaptures.push(validOrangeCapturesRow + (number - 2));
                  }
                }
                if(number - 2 >= 0 && (this.state.checkerBoard[validOrangeRowBackwards][number - 1] === 'X')) { //backwards too

                    if(!this.state.checkerBoard[validOrangeCapturesRowBackwards][number - 2]){
                        validOrangeCaptures.push(validOrangeCapturesRowBackwards + (number - 2));
                    }
                }

                if(number + 2 < 10 && (this.state.checkerBoard[validOrangeRow][number + 1] === 'X')) {

                    if(!this.state.checkerBoard[validOrangeCapturesRow][number + 2]){
                        validOrangeCaptures.push(validOrangeCapturesRow + (number + 2));
                    }
                }
                if(number + 2 < 10 && (this.state.checkerBoard[validOrangeRowBackwards][number + 1] === 'X')) {//backwards too

                    if(!this.state.checkerBoard[validOrangeCapturesRowBackwards][number + 2]){
                        validOrangeCaptures.push(validOrangeCapturesRowBackwards + (number + 2));
                    }

                }

                this.setState({
                  validOrangeMoves: [...validOrangeMoves],
                  validOrangeCaptures: [...validOrangeCaptures]
                })

            }
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

      if (this.state.validOrangeCaptures.includes(rowLetter + number) ||
          this.state.validBlueCaptures.includes(rowLetter + number)) {
        checkerBoard[rowLetter][number] = checkerBoard[selectedRow][selectedColumn];
        let rowToDel;
        let colToDel;
        if (this.rowNumber[this.state.isSelected[0]] > this.rowNumber[rowLetter]) {
             rowToDel = this.rowID[this.rowNumber[rowLetter] + 1];
             console.log(rowToDel);
        } else { rowToDel = this.rowID[this.rowNumber[rowLetter] - 1];             console.log('row to del is = ' + rowToDel);
}
        if (this.rowNumber[this.state.isSelected[0]] > number ) {
             colToDel = number + 1;
        } else { colToDel = number - 1;}
        checkerBoard[rowToDel][colToDel] = '';
        checkerBoard[selectedRow][selectedColumn] = '';

        this.setState( {
          checkerBoard: checkerBoard,
          isSelected:[],
          validBlueMoves: [],
          validOrangeMoves: [],
          validBlueCaptures: [],
          validOrangeCaptures: [],
          // bluesTurnToPlay : !this.state.bluesTurnToPlay
        })
        console.table(this.state.checkerBoard);
    } else if (this.state.validOrangeCaptures.length < 1 &&
        this.state.validBlueCaptures.length < 1)
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
          validOrangeCaptures: [],
          bluesTurnToPlay : !this.state.bluesTurnToPlay
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
        onClick={() => this.handleClick(rowLetter, (number - 1), this.state.bluesTurnToPlay)}
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
