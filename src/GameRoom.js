import React from 'react';
import io from "socket.io-client";
//remove this line
function Square(props) {
    return (
    <div
      className={"square"}
      id={props.id}
      onClick={props.onClick}
      stateofsquare={props.stateOfSquare}
    >
      {props.stateOfSquare &&
        <img src={`/images/${props.stateOfSquare}.png`} alt="checker piece"/>
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
      playerPieces: '',
      boardGame: '',
    };
    this.socket = io('localhost:8080');

    let paramId = props.match.params.id;
    this.socket.emit('join_room', paramId);  // attempt to join room upon loading the page


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
    //___________________________________________________________________
    const showTurn = data => {                      //Give X or O checker pieces to player depending on order of entrance in the Room
        this.setState({playerPieces: data});
        if (data === 'X') {document.getElementById("boardGame").style.transform = "rotate(180deg)";}
    };

    this.socket.on('playerOrder', function(player){ // display whose turn it is
        showTurn(player);
    });

    this.socket.on('Room is full', function(){  // redirect to homepage if room is full, maybe introduce a spectator mode in the future
        window.alert('This Room is already full')
        window.location.replace("http://localhost:3000/");
    });

    window.onbeforeunload = function(e) {  // Fix bug where if reload page, player 1 becomes player 2 along with player 2, not fixed yet, postponed
        window.alert("You can't reload while in a gaming room, you will now be redirected to the homepage")
        window.location.replace("http://localhost:3000/");
        this.socket.emit('reload');
    };

  };

  handleClick(row, number) {
    console.log(row, number);
    console.log("this.state.checkerBoard[row][number] = " + this.state.checkerBoard[row][number]);
    console.log("this.playerPieces = " + this.state.playerPieces);
    if (this.state.checkerBoard[row][number] === this.state.playerPieces) {
        console.log('ur player number is :' + this.state.playerPieces);
      this.state.isSelected = new Array(row, number);
      console.log(this.state.isSelected);
  } else if (this.state.checkerBoard[row][number] === ''){
      return this.handleEmpty(row, number);
    }

  };

  handleEmpty(rowLetter, columnNumber) {
    if (this.state.isSelected.length) {  // Jam :  try to fix bug which causes react to crash when the first click is on an empty blue(valid) cell, Think I got it, just added length here or else the condition is just wether the array is undefined or not
      let checkerSelected = [...this.state.isSelected];
      let checkerBoard = this.state.checkerBoard;
      // let checkerColour = checkerBoard[checkerSelected[0]][checkerSelected[1]]; // try to fix bug which causes react to crash when the first click is on an empty blue(valid) cell, postponed for now
      let checkerColour = checkerBoard[checkerSelected[0]][checkerSelected[1]];
      let rowNumericalValue = this.rowID.indexOf(rowLetter);

      if (!((rowNumericalValue + columnNumber) % 2)) {
        console.log('invalid move, that\'s a forbidden square mate!');
        return;
      } else {
        checkerBoard[rowLetter][columnNumber] = checkerBoard[checkerSelected[0]][checkerSelected[1]];
        checkerBoard[checkerSelected[0]][checkerSelected[1]] = '';
        this.setState( {
          checkerBoard: checkerBoard
        })
        console.table(this.state.checkerBoard);
      }


  } else { return;}
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
      onClick={() => this.handleClick(row, (number - 1))}
    />)));

    return (
      <div className="container">
      <p>You are player : {this.state.playerPieces}</p>
        <div id="boardGame">
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
