import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import Base from '../core/Base';



const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    const { name, email, password, error, success } = values;
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then((data) => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: "error found", success: false })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(console.log("Error"))
    }

    const signUpform = () => {
        return (
            <div className='Main_form'>
                <div className='row'>
                    <div className='col-md-6 offset-sm-3 text-left'>
                        <form>
                            <div className='form-group my-4'>
                                <label className='text-light form-label text-left'>Name</label>
                                <input className='form-control' value={values.name} type="text" onChange={handleChange("name")} />
                            </div>
                            <div className='form-group my-4'>
                                <label className='text-light form-label text-left'>Email</label>
                                <input className='form-control' value={values.email} type="email" onChange={handleChange("email")} />
                            </div>
                            <div className='form-group my-4'>
                                <label className='text-light form-label text-left'>Password</label>
                                <input className='form-control' value={values.password} type="password" onChange={handleChange("password")} />
                            </div>
                            <button onClick={onSubmit} className='btn btn-success btn-block w-100'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    const successMessage = () => {
        return (

            <div className='alert alert-success'
                style={{ display: success ? " " : "none" }}
            >
                New Account was created successfully.<Link to="/signin"> Login here </Link>
            </div>
        )
    }
    const errorMessage = () => {
        return (

            <div className='alert alert-danger'
                style={{ display: error ? " " : "none" }}
            >
                {error}
            </div>
        )
    }
    return (
        <Base title="This is signup page" description="signup Workds">
            <div className='row'>
                <div className='col-md-6 offset-sm-3 my-3'>
                    {successMessage()}
                    {errorMessage()}
                </div>
            </div>

            {signUpform()}
            <p>{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup