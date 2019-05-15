import React from 'react';
import io from "socket.io-client";
import GameRules from "./gameRules";
function Square(props) {
    return (
    <div
      className={"square"}
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
      validCapturesForBlue: [],
      validOrangeMoves: [],
      validCapturesForOrange: [],
      turnToPlay: 'blue',
    };
    //Creating the checkerBoard, an object with keys from A to J and values of 10 array elements
    this.state.checkerBoard = this.rowID.reduce((accumulator, currentValue, i) => {
      accumulator[currentValue] = new Array(10).fill('');
      return accumulator;
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

  handleClick(rowLetter, number) {
    let rowNumber = this.rowID.indexOf(rowLetter);
    if (this.state.checkerBoard[rowLetter][number]) {

      let player = this.state.checkerBoard[rowLetter][number];
      switch(player) {
        case 'X' :
          let validBlueRow = this.rowID[rowNumber + 1];
          let validBlueMoves = [validBlueRow + (number - 1), validBlueRow + (number + 1)];
          this.setState({
            validBlueMoves: [...validBlueMoves]
          })
          break;
        case 'O' :
          let validOrangeRow = this.rowID[rowNumber - 1];
          let validOrangeMoves = [validOrangeRow + (number - 1), validOrangeRow + (number + 1)];

          this.setState({
            validOrangeMoves: [...validOrangeMoves]
          })
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
      let rowNumericalValue = this.rowID.indexOf(rowLetter);
      console.log(rowNumericalValue, number);

      // Make it so that you can not move pieces on orange squares
      if (!((rowNumericalValue + number) % 2)) {
        console.log('invalid move, that\'s a forbidden square mate!');
        return;

      // } else if ((rowNumericalValue !== (this.rowID.indexOf(selectedRow) - 1)) &&
      //   ((number !== (selectedColumn + 1)) || (number !== (selectedColumn - 1)))) {
      //     console.log('can\'t move further than one square champ!');
      } else {
        checkerBoard[rowLetter][number] = checkerBoard[selectedRow][selectedColumn];
        checkerBoard[selectedRow][selectedColumn] = '';

        this.setState( {
          checkerBoard: checkerBoard,
          isSelected:[]
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
