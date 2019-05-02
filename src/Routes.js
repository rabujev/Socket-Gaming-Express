import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {Switch} from 'react-router';

import Chat from "./Chat";
import Homepage from "./Homepage";
import Row from "./GameRoom";

export const Routes = () => {
  return(
    <>
        <Router>
            <Switch>
              <Route exact path="/" component={Homepage}/>
              <Route path="/chat/:id" component={Chat}/>
              <Route path="/gameRoom/:id" component={Row}/>
            </Switch>
        </Router>
    </>
  )
};

export default Routes;
