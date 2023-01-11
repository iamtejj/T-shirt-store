import React from 'react'
import './styles.css'
import {
    BrowserRouter,
    Switch,
    Route
  } from "react-router-dom";
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminRoute from './auth/helper/AdminRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';

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
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute path="/admin/create/category" exact component={AddCategory} />
      </Switch>
    </BrowserRouter>
  )
}
