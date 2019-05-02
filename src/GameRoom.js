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

  render() {
      let tenSquares = [];
      for (let i = 1; i < 11; i++) {
        tenSquares.push(<Square id = {i}/>);
      }

    return (
        <div className="boardRow">
          {tenSquares}
        </div>
    );
  }
}

export default Row;
