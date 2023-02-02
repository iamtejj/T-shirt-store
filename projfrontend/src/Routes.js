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
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';


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
        <Route exact path="/cart">
          <Cart />
        </Route>
        
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute path="/admin/categories" exact component={ManageCategories} />
        <AdminRoute path="/admin/create/category" exact component={AddCategory} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
      </Switch>
    </BrowserRouter>
  )
}
