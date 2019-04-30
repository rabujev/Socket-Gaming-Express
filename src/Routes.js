import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {Switch} from 'react-router';

import Chat from "./Chat";
import Homepage from "./Homepage";

export const Routes = () => {
  return(
    <>
        <Router>
            <Switch>
              <Route exact path="/" component={Homepage}/>
              <Route path="/chat/:id" component={Chat}/>
            </Switch>
        </Router>
    </>
  )
};

export default Routes;
