import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {Switch} from 'react-router';

import Chat from "./Chat";
import Navbar from "./navbar";

export const Routes = () => {
  return(
    <>
        <Router>
            <Switch>
              <Route exact path="/" component={Navbar}/>
              <Route path="/chat" component={Chat}/>
            </Switch>
        </Router>
    </>
  )
};

export default Routes;
