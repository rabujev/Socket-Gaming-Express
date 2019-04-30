import React, { Component } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Routes from "./Routes";

import JoinRoom from "./JoinRoom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {Switch} from 'react-router';
class App extends Component {
  render() {
    return (
        <>
            <Routes/>
        </>

    );
  }
}

export default App;
