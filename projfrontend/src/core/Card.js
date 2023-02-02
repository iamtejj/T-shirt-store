import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemtoCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({ product, addtoCart = true, removeFromCart = false, setReload= f => f ,reload=undefined }) => {
    const cardTitle = product? product.name :"A Photo From Pixel";
    const cardDescription = product? product.description :"A Photo From Pixel";
    const cardPrice = product? product.price :"A Photo From Pixel";

    const [redirect,setRedirect] = useState(false);
    
    const [count,setCount] = useState(product.count);

    const addToCart = () =>{
        addItemtoCart(product,()=>{
            setRedirect(true)
        })
    }

    const getARedirect = (redirect)=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }
    
    const showAddTocart = () => {
        return (
            addtoCart && (
                <div className="col-12">
                    <button
                        onClick={addToCart}
                        className="btn btn-block btn-outline-success mt-2 mb-2"
                    >
                        Add to Cart
                    </button>
                </div>
            )
        )
    }
    const showRemoveFromCart = () => {
        return (
            removeFromCart && (
                <div className="col-12">
                    <button
                        onClick={() => { 
                            removeItemFromCart(product._id);
                            setReload(!reload)
                        }}
                        className="btn btn-block btn-outline-danger mt-2 mb-2">
                        Remove from cart
                    </button>
                </div>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                {getARedirect(redirect)}
                <ImageHelper key={product._id } product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
                <div className="row">
                {showAddTocart(addtoCart)}
                {showRemoveFromCart(removeFromCart)}

                </div>
            </div>
        </div>
    );
};

export default Card
