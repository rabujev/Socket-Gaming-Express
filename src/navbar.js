import React from "react";
import io from "socket.io-client";
import uuidv4 from "uuid/v4";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Navbar extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            room: '',
        };

        this.socket = io('localhost:8080');




        this.joinRoom = ev => {
          ev.preventDefault();
          this.setState({room: uuidv4()}, () => {
            window.alert("Please join this room: " + this.state.room);
            console.log("this.state.room = " + this.state.room);
            this.socket.emit('join_room', this.state.room);
            window.location.replace("http://localhost:3000/chat");
          })
        }
    }


    render(){
        return (
            <div className="container">
                <ul className="header">
                    <li><Link to="/">Home</Link></li>
                    <li><Link onClick = {this.joinRoom} to="/chat" >GOGO</Link></li>
                </ul>
            </div>
        );
    }
}

export default Navbar;
