import React ,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import StripeCheckoutbutton from 'react-stripe-checkout';
import { creatOrder } from './helper/oderHelper';
import { API } from '../backend';


const StripeCheckout = ({products,setReload = f => f,reload=undefined}) =>{

    const [data,setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })
    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () =>{
        let amount = 0;
        products.map(p =>{
            amount = amount + p.price
        })
        return amount
    }
    
    const makePayment = (token) =>{
        //TO DO:backend request
        const body ={
            token,
            products
        }
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}stripepayment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        })
        .then(response => {
            console.log(response)
            //creatOrder()
        })
        .catch(error => console.log(error))
    }

    const showStripeButton = () =>{
        return isAuthenticated() ?(
            <StripeCheckoutbutton
            stripeKey="pk_test_51MXbU8SAHRB4sFYpdcq7LWZ4wXnm0mveN7YUAwuNAFHJmULqFn8RjabnMgIZVCSYew8WLEnEPxtUZYtonACDHVQn00w21bIJB1"
            token={makePayment}
            amount={getFinalPrice()*100}
            name="Buy T shirt"
            shippingAddress
            billingAddress 
            >
                <button className='btn btn-success'>Pay with Strip</button>
            </StripeCheckoutbutton>
            
        ) :(
            <Link to="/signin" ><button className='btn btn-warning'>Sign In</button></Link>
        )
    }
    return(
        <div>
            <h2>Stripe Checkout Loaded{getFinalPrice()} </h2>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout