import React, { Component } from 'react';
import Chat from "./Chat";
import Navbar from "./navbar";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


import JoinRoom from "./JoinRoom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {Switch} from 'react-router';
class App extends Component {
  render() {
    return (
        <>
            <Router>
                <Switch>
                  <Route exact path="/" component={Navbar}/>
                  <Route path="/chat" component={Chat}/>
                </Switch>
            </Router>
        </>

    );
  }
}

export default App;
