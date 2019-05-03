import React from 'react';
import io from "socket.io-client";

function Square(props) {
  return (
    <button className={"square " + props.className}>

    </button>
  );
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenSquares: []
    }
    for (let i = 1; i < 11; i++) {
      this.state.tenSquares.push(<Square className={i}/>);
    }
  }

  render() {
    return (
        <div className="boardRow" id={this.props.id}>
          {this.state.tenSquares}
        </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    let rowID = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    this.state = {
      row: rowID.map(id => <Row id={id}/>),
    };
  }

  render() {
    return (
      <div className="container">
        <div className="boardGame">
          {this.state.row}
        </div>
      </div>
    )
  }
}

export default Board;
