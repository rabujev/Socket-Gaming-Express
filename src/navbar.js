import React from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Navbar extends React.Component{
    render(){
        return (
            <div className="container">
                <ul className="header">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/chat">Chat</Link></li>
                </ul>
            </div>
        );
    }
}

export default Navbar;
