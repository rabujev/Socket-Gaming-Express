import React from 'react';
import io from "socket.io-client";

function Square(props) {
  return (
    <button className="square">

    </button>
  );
}

class Row extends React.Component {
  createRow = (iteration) => {
    return (

    )
    for (let i = 0; i < 10; i++) {
      square;
    }
  }

  render() {
    return (
        <div className="boardRow">
          {this.createRow(<Square/>)}
        </div>
    );
  }
}

export default Row;
