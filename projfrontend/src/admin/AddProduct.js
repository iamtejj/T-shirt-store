import React, { useEffect, useState } from 'react';
import { Link ,Redirect,Route,useHistory,useLocation} from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategories, createaProduct } from './helper/adminapicall';

const AddProduct = () => {
  let history = useHistory();
  
  const { user, token } = isAuthenticated();

  const [values, setValuse] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedircect: false,
    formData: ""
  });

  const { name, description, price, stock, photo, categories, category, loading, error, createdProduct, getaRedircect, formData } = values;

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        setValuse({ ...values, error: data.error })
      }
      else {
        setValuse({ ...values, categories: data,getaRedircect:false,formData: new FormData() })
      }
    })
  }
  useEffect(() => {
    preload();
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    setValuse({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValuse({ ...values, error: data.error, performRedirect:false ,loading: false, createdProduct: "" })
      }
      else {
        setValuse({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          error: "",
          getaRedircect:true,
          createdProduct: data.name
        })
      }
    })
  }
  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValuse({ ...values, [name]: value ,performRedirect:false});
  }

  const successMessage = () => {
    setTimeout(()=>{
      if(getaRedircect){
          history.push("/")
          setValuse({...values,getaRedircect:false})
      }
    },2000)
        
    return (
      <div className='alert alert-success mt-3'
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} Created Successfully</h4>
      </div>
    
    )
  }
  

  const errorMessage = () => {
    return (
      <div className='alert alert-danger mt-3'
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error} Occured in Saving Product</h4>
      </div>
    )
  }

  const createProductForm = () => (
    <form >
      <span>Post photo</span>
      <div className="form-group mb-3">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mb-3">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("price")}
          type="number"
          name="price"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mb-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          name="category"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return <option key={index} value={cate._id}>{cate.name} </option>
            })
          }
        </select>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          name="stock"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-4">
        Create Product
      </button>
    </form>
  );

  return (
    <Base title='Add Product over herer' description='Welcome to product Creation section' className='container bg-info p-4'>
      <Link to='/admin/dashboard' className='btn btn-md btn-dark mb-3'>Admin Home</Link>
      <div className='row bg-dark text-white rounded'>
        <div className='col-md-8 offset-md-2'>
          {successMessage()}
       
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  )
}

export default AddProduct;