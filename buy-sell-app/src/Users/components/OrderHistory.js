import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from "antd";
import { email_id } from '../../LoginAndRegistration/Login';


const OrderHistory = () => {

    const [data,setData]=useState([])
    const [email,setEmail]=useState(email_id)
  

    
    const getOrderData=()=>{
      // const current=JSON.parse(localStorage.getItem("current"));
      // const email=current.email;
      axios.get(`http://localhost:5000/order/${email}`)
      .then((resp)=>{
        const data=resp.data;
        setData(data);
      })
      .catch((error)=>{
          console.log('error in sending data for order',error)
      })
    }

  

     useEffect(()=>{
          getOrderData()
     })

      
//Table Data
const columns = [
 
  
  { title: "Order Date", dataIndex: "date" },
  {
    title: "Order Items",
    dataIndex:"product",
    render: (record) =>    {
      if (!record || !Array.isArray(record)) {
        return null|| 'no data';
      }

      return (
        <table className='table'>
        <thead>
        <th>Item Name</th>
        <th style={{textAlign:"center"}}>Quantity</th>
        <th style={{textAlign:"center"}}> Price</th>
        </thead>

          {record.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td style={{textAlign:"center"}}> {item.quantity}</td>
              <td style={{textAlign:"center"}}>₹{item.price}</td>
            </tr>
          ))}
        </table>
      );
    },
           
            
  },

  { title: "Total", dataIndex: "total",
    render:(record)=>(
        <div>₹ {record}</div>
    )


},

    

  
]
  
  
  return (
    <div>

    <h2>Order History</h2>
    
    
          <Table columns={columns} dataSource={data} bordered className="table" />
    
     
     
     
        
        </div>
      
     
     
     
)
}


export default OrderHistory


