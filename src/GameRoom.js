import React from 'react';
import io from "socket.io-client";

function Square(props) {
  return (
    <button className="square">

    </button>
  );
}

class Row extends React.Component {

  render() {
      let tenSquares = [];
      for (let i = 0; i < 10; i++) {
        tenSquares.push(<Square/>);
      }

    return (
        <div className="boardRow">
          {tenSquares}
        </div>
    );
  }
}

export default Row;
