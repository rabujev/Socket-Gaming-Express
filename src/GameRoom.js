import React from 'react';
import io from "socket.io-client";

function Square(props) {
  return (
    <button className="square" id={props.id}>
    ""
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
  renderRow(i) {
    return (
      <Row id={i}/>
    )
  }
  render() {
    return (
      <div className="boardGame">
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
        {this.renderRow(6)}
        {this.renderRow(7)}
        {this.renderRow(8)}
        {this.renderRow(9)}
        {this.renderRow(10)}
      </div>
    )
  }
}

export default Board;
