import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from '../core/Base'

const AdminDashBoard = () =>{
    const {user:{name,email,role}} = isAuthenticated();

    const adminLeftside = () =>{
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success">Create Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminRightside = () =>{
        return(
            <div className="card mb-4">
                <h4 className="card-header">Admin information</h4>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-start">
                        <span className="badge badge-secondary text-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item d-flex justify-content-start">
                        <span className="badge badge-secondary text-success mr-2">Email:</span> {email}
                    </li>
                    <li className="list-group-item d-flex justify-content-start">
                        <span className="badge badge-secondary text-success mr-2">Admin area</span>
                    </li>
                </ul>
            </div>
        )
    }
    return(
        <Base title="Welcome to Admin Area" description="Manage All of your Product here" className="container bg-success p-4">
            <div className="row">
                <div className="col-3">
                    {adminLeftside()}
                </div>
                <div className="col-9">
                    {adminRightside()}
                </div>
            </div>
        </Base>
    )
}

export default AdminDashBoard