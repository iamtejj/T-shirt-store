import React, { useEffect, useState } from 'react'

import '../styles.css'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'


const Cart = () => {
    const [products,setProducts] = useState([])
    const [reload,setReload] = useState(false)
    const loadAllproduct = () => {
        return(
            <div>
                <h2>this section is to load product</h2>
                {products.map((product,index) => {
                    return(
                        <Card key={index} product={product} addtoCart={false} removeFromCart={true} setReload={setReload} reload={reload}/>
                    )
                })}
            </div>
        )
    }
    useEffect(()=>{
        setProducts(loadCart())
    },[reload])

    const loadCheckout = () => {
        return(
            <div>
                <h2>this section is to load Checkout</h2>
                
            </div>
        )
    }

  return (
    <Base title="Cart Page"  description="Ready to checkout">
      <div className='row text-center'>
        <div className='col-6'>
            {loadAllproduct()}
        </div>
        <div className='col-6'>
            {loadCheckout()}
        </div>
      </div>
    </Base>
  )
}

export default Cart