import React, { useState } from 'react';
import Base from '../core/Base';


const Signin = () =>{
    const signInform = () =>{
        return(
            <div className='Main_form'>
                <div className='row'>
                    <div className='col-md-6 offset-sm-3 text-left'>
                        <form>
                            <div className='form-group my-4'>
                                <label className='text-light form-label text-left'>Name</label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='form-group my-4'>
                                <label className='text-light form-label text-left'>Password</label>
                                <input className='form-control' type="password" />
                            </div>
                            <button className='btn btn-success btn-block w-100'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <Base title="This is signup page" description="signin Workds">
        <div>You are in singn in</div>
        {signInform()}
        </Base>
    )
}

export default Signin