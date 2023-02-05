import React, { useEffect, useState } from 'react'

import '../styles.css'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import StripeCheckout from './StripeCheckout'


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

  

  return (
    <Base title="Cart Page"  description="Ready to checkout">
      <div className='row text-center'>
        <div className='col-6'>
            {loadAllproduct()}
        </div>
        <div className='col-6'>
            <StripeCheckout
                products={products}
                setReload={setReload}
                reload={reload}
            />
        </div>
      </div>
    </Base>
  )
}

export default Cart