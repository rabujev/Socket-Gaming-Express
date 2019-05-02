import React from 'react';
import io from "socket.io-client";
function Square(props) {
  return (
    <button className="square" id={props.id}>

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
  renderRow(rowID) {
    return (
      <Row id={rowID}/>
    )
  }
  render() {
    return (
      <div className="boardGame container">
        {this.renderRow('A')}
        {this.renderRow('B')}
        {this.renderRow('C')}
        {this.renderRow('D')}
        {this.renderRow('E')}
        {this.renderRow('F')}
        {this.renderRow('G')}
        {this.renderRow('H')}
        {this.renderRow('I')}
        {this.renderRow('J')}
      </div>
    )
  }
}

export default Board;
