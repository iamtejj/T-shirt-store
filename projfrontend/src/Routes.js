import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route
  } from "react-router-dom";
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"  >
          <Home />
        </Route>
        <Route exact path="/signup" >
          <Signup />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
