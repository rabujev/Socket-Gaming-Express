import React from "react";
import io from "socket.io-client";
import uuidv4 from "uuid/v4";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            room: '',
        };

        this.socket = io('localhost:8080');

        this.joinRoom = ev => {
          ev.preventDefault();
          let roomId = uuidv4();
          this.setState({room: roomId}, () => {
            window.alert("Please join this room: " + this.state.room);
            console.log("this.state.room = " + this.state.room);
            window.location.replace("http://localhost:3000/chat/" + roomId);
          })
        }
    }


    render(){
        return (
          <div className="container mt-2">
            <div className="row justify-content-center">
              <div className="col-sm-4">
                <button  onClick = {this.joinRoom} className="btn btn-primary form-control">Generate Game Room</button>
              </div>
            </div>
          </div>
        );
    }
}

export default Homepage;
