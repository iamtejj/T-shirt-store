import React, { useState } from 'react';
import Base from '../core/Base';
import { signin, authenticate, isAuthenticated } from '../auth/helper'
import { Link, Redirect } from 'react-router-dom';

const Signin = () => {
    const [values, setValues] = useState({
        email: "john@gmail.com",
        password: "john123456",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect, success } = values;
    const user = isAuthenticated();
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });

    }
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                console.log(data)
                if (data.errors) {
                    setValues({ ...values, error: data.errors.length, loading: false });
                }
                else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(console.log('signIn Request Failed'));
    }

    const performRedirect = () => {

        //TODO: do a redirect here
        if (didRedirect) {
            if (user && user.role === 1) {
                return <p>Redirect To Admin</p>
            }
            else {
                return <p>Redirect to user Dashboard</p>
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className='row'>
                    <div className='col-md-6 offset-sm-3 text-left'>
                        <div className='alert alert-info'>
                            <h2>Loading....</h2>
                        </div>
                    </div>
                </div>
            )
        )
    }
    const errorMessage = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <div className='alert alert-danger'
                        style={{ display: error ? " " : "none" }}
                    >
                        <p>Please Check credencial</p>
                    </div>
                </div></div>
        )
    }
    const signInform = () => {
        return (
            <div className='Main_form'>
                <div className='row'>
                    <div className='col-md-6 offset-sm-3 text-left'>
                        <form>
                            <div className='form-group my-4'>
                                <label className='text-light form-label text-left'>Email</label>
                                <input value={email} onChange={handleChange("email")} className='form-control' type="email" />
                            </div>
                            <div className='form-group my-4'>
                                <label className='text-light form-label text-left'>Password</label>
                                <input value={password} onChange={handleChange("password")} className='form-control' type="password" />
                            </div>
                            <button onClick={onSubmit} className='btn btn-success btn-block w-100'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Base title="This is signin page" description="signin Workds">
            <div>You are in singn in</div>
            {loadingMessage()}
            {errorMessage()}
            {signInform()}
            {performRedirect()}
            <p className='text text-white'>{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin