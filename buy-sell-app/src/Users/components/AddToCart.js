import axios from 'axios'
import { message } from 'antd'

export const AddToCart=(item,email)=>{

     

        axios.post(`http://127.0.0.1:5000/add-to-cart`,{
           
        'name':item.name,
        'email':email,
        'image':item.image,
        'price':item.price
      })
      .then((resp)=>{
        message.success("item is added to cart")
       console.log('after sending in cart ',resp.data)
      })
      .catch((error)=>console.log('error in sending in cart ',error))
      
      }

