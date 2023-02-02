import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { getCategories } from './helper/adminapicall';

const ManageCategories = () => {
    const [categories, setCategories] = useState([])
    const fetchCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setCategories(data)
            }
        })

    }
    useEffect(() => {
        fetchCategories();
    }, [])

    const categoryList = () => {


        return (
        
                categories.map((category, index) => {
                    console.log(category)
                    return (
                        <>
                        <div key={category._id} className='row bg-dark text-white rounded my-2' >
                            <div  className='col-4 text-left'>
                                <h3>{category.name}</h3>
                            </div>
                            <div  className='col-4 text-center'>
                                <Link
                                    className="btn btn-success"
                                    to={`/admin/category/update/${category._id}`}
                                >
                                    <span className="">Update</span>
                                </Link>
                            </div>
                            <div  className='col-4 text-center'>
                                <button className='btn btn-danger'>
                                    Delete
                                </button>
                            </div>
                            </div>
                        </>
                    )
                })
          
        )
    }

    return (
        <Base title='Manage Categrories' description='Update Delete Your Category Here'>
            <div className='row bg-dark text-white rounded' >
            {categoryList()}

            </div>
        </Base>
    )
}




export default ManageCategories;