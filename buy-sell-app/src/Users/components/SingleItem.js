import React, { useState } from 'react'
import { AddToCart } from './AddToCart'
import { email_id } from '../../LoginAndRegistration/Login'

const SingleItem = ({item}) => {

     const [email,setEmail]=useState(email_id)
    const addItem=(item)=>{
          AddToCart(item,email)
    }
  return (
    <div className="col-md-4 mb-6" key={item._id}>
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={item.image}
        alt="product"
        style={{ width: "18rem", height: "200px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <p className="card-text">{item.price} Rs</p>
        <button className="btn btn-primary" onClick={()=>{addItem(item)}}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  )
}

export default SingleItem