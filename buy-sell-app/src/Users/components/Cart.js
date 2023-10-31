import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import '../CSS/cart.css'
import { email_id } from '../../LoginAndRegistration/Login'
export default class Mycart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mycart: [],
            total:0,
            email:email_id
           
           
        }
    }

    getData(){
      
      
    

      if (this.state.email) {
         
              console.log('email:', this.state.email);
              axios.get(`http://127.0.0.1:5000/add-to-cart/${this.state.email}`)
              .then((resp)=>{
                const data=resp.data;
                console.log('data',data);
                this.setState({mycart:data})
       
                const total = this.totalAmount(this.state.mycart)
              
               this.setState({total:total })
       
                
                
                
              })
              .catch((error)=>{console.log('error in getting of cart items',error)
                      console.log(this.state.email)
           })
          
      } else {
          console.log('email is empty');
      }




     

    }

    checkCart=()=>{
        const {mycart}=this.state;
        if(mycart.length===0){
           return false;
           
        }
        return true;

   }

    componentDidMount = async() => {
        this.getData()

      this.checkCart();
   

}


    //update cart items after increment or decrement quantity

    updateCart=(id,quantity)=>{
      axios.put(`http://127.0.0.1:5000/add-to-cart/${id}`,{
        "quantity":quantity
      })
      .then((resp)=>console.log('after updating',resp.data))
      .catch((error)=>console.log('error in updating ',error))
      
     }


    decrement = (e, id) => {
        const { mycart } = this.state
        const selectedCartIndex = mycart.findIndex((cart) => cart._id === id)
        const selectedCart = mycart[selectedCartIndex]
        const myquantity = selectedCart.quantity - 1
        if (myquantity !== 0) {
            selectedCart["quantity"] = myquantity
            mycart[selectedCartIndex] = selectedCart
            const total = this.totalAmount(mycart)
            this.setState({ mycart,total })
            
        }

        
        this.updateCart(id,myquantity);
        


    }

   

    increment = (e, id) => {
        const { mycart } = this.state
        const selectedCartIndex = mycart.findIndex((cart) => cart._id === id)
        const selectedCart = mycart[selectedCartIndex]
        const myquantity = selectedCart.quantity + 1
        selectedCart["quantity"] = myquantity
        mycart[selectedCartIndex] = selectedCart
        const total = this.totalAmount(mycart)
        this.setState({ mycart,total })
        this.updateCart(id,myquantity);
        
    }

    totalAmount = (mycart) => {
       
       
        const total = mycart.reduce((a, b) => {
          console.log('price',b.price)
            return a + b['price']*b['quantity'];
        }, 0)
        return total
    }





    // this is for updating price after removing from cart

    removePrice=(price,quant)=>{
      const {total}=this.state;

        this.setState({"total":total-price*quant})
    }
  
    removeCartItem(_id,price,quant){
       axios.delete(`http://127.0.0.1:5000/remove-cart/${_id}`)
       .then((resp)=>{
        console.log(resp.data)
         this.removePrice(price,quant)
        
        }
        )
       .catch((error)=>console.log('error in sending data',error))
    }



    handle_remove=(e)=>{
       const {mycart}=this.state;

      const _id=e.target.value;
      console.log(_id)
      var price,quant;
       for(let item of mycart){
           if(item._id===_id){
             price=item.price;
             quant=item.quantity;
             console.log(price,quant)
           }
            
       }
       const filterData=mycart.filter((item)=>item._id!==_id)
       console.log(filterData)
      this.setState({mycart:filterData})
      message.success("item is removed from cart ")
   
    //updating in total  price in ui and backend after removing from cart entirely 
      this.removeCartItem(_id,price,quant)
   
       
       
   }




   removeFromCart=(email)=>{
      axios.delete(`http://127.0.0.1:5000/add-to-cart/${email}`)
      .then((resp)=>{console.log("after deleting cart items in database",resp.data)
    
        this.setState({total:0})
    })
      .catch((error)=>console.log('error in deleting cart items in database',error))
   }


   placeOrder=()=>{

    const {email,total,mycart}=this.state;
        const today=new Date();
        

        //message.success(" order placed successfullly ")
        axios.post(`http://127.0.0.1:5000/order`,{
          "email":email,
          "product":mycart,
          "total":total,
          "date":today


        }).then((resp)=>{
            message.success("placed order successfully!!")
            this.setState({"mycart":[]})
            
            //remove in database
            this.removeFromCart(email)
        })
        .catch((error)=>console.log('error in sending in order items ',error))

   }

   confirm_order=()=>{
        
         this.placeOrder();

 }

    
    render() {
        const { mycart,total } = this.state
        return (
            <div className='container'>
              <div className='top-cart-header'>
               <div><Link to='/user'> <h3>Continue Shopping</h3></Link> </div>
                <div><h3>My Cart</h3></div>
                <div><Link to='/user/cart/history'><h3> Order history </h3></Link></div>

              </div>

                <div className="row mt-5">
                    <div className="col-md-6" style={{height:"558px",overflowY:"scroll"}}>
                        {
                            mycart.length !== 0 ? mycart.map((cart, index) => (
                                <div className="card mb-3" style={{ maxWidth: 540 }} key={index}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={cart.image} className="img-fluid rounded-start" alt={cart.title} />
                                            <button className="btn btn-primary"  value={cart._id}  onClick={this.handle_remove}
                                            style={{marginTop:"8px"}}
                                            >
                                            Remove
                                            </button>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{cart.title}</h5>
                                                <p>₹ {cart.price *cart.quantity}</p>
                                                <label className="form-label">Quantity</label>
                                                <input className='form-control mb-3' type="text" value={cart.quantity} readOnly />
                                                <button className='btn btn-info' style={{ marginRight: "5px" }} onClick={(e) => this.decrement(e, cart._id)} >-</button>
                                                <button className='btn btn-info' onClick={(e) => this.increment(e, cart._id)} >+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <div>Empty Cart</div>
                        }
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-3" style={{ maxWidth: 540 }} >
                            <div className="row g-0">
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">Total ₹ {total} </h5>
                                        <button className='btn btn-info' onClick={()=>{this.confirm_order(mycart)}}
                                        disabled={!this.checkCart()}
                                        >Confirm Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}