import React from 'react';
import io from "socket.io-client";

function Square(props) {
  return (
    <button className="square" id={props.id}>
    {props.id}
    </button>
  );
}

class Row extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      let tenSquares = [];
      for (let i = 1; i < 11; i++) {
        tenSquares.push(<Square id = {i}/>);
      }

    return (
        <div className="boardRow" id = {this.props.id} >
          {tenSquares}
        </div>
    );
  }
}

class Board extends React.Component {
  render() {
    let fullBoard = [];
    for (let i = 1; i < 11; i++) {
      fullBoard.push(<Row id={i}/>)
    }
    return (
      <div className="board">
        {fullBoard}
      </div>
    )
  }
}

export default Row;
