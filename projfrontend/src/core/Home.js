import React, { useEffect, useState } from 'react'
import { getProducts } from '../admin/helper/adminapicall'
import '../styles.css'
import Base from './Base'
import Card from './Card'

export default function Home() {
  const [products,setProducts] = useState([])
  const [error,setError] = useState(false)

  const loadAllproduct = ()=>{
    return getProducts().then(data =>{
      if(data.error){
        setError(data.error)
      }
      else{
        setProducts(data)
      }
    })
  }

  useEffect(()=>{
    loadAllproduct();
  },[]);

  return (
    <Base title="Home page"  description="Welcome to the T-shirt store">
      <div className='row text-center'>
        <h1 className='text-white'>All of tshirts</h1>
        <div className='row'>
          {products.map((product,index)=>{
              return(
                 <div className='col-4 mb-4'>
                    <Card key={product._id} product={product} />
                 </div> 
              )
          })}
        </div>
      </div>
    </Base>
  )
}
