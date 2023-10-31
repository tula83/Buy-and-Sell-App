import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Table} from "antd";
import DefaultLayout from './Layout';



const OrderHistory = () => {

    const [data,setData]=useState([])

    
    const getOrderData=()=>{
      axios.get(`http://localhost:5000/order`)
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
 
  { title: "Email", dataIndex: "userEmail" },
  { title: "Order Date", dataIndex: "date" },
  {
    title: "Order Items",
    dataIndex:"product",
    render: (record) =>    {
      if (!record || !Array.isArray(record)) {
        return null|| 'no data';
      }

      return (
        <table className='table table-borderless '>
        <thead>
        <th> Item Name </th>
        <th> Quantity </th>
        <th>  Price </th>
        </thead>

          {record.map((item) => (
            <tr key={item._id}>
              <td>  {item.name.substring(0,29)} </td>
              <td style={{textAlign:"center"}}> {item.quantity} </td>
              <td style={{textAlign:"center"}}> ₹{item.price} </td>
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
    <DefaultLayout>

    <h2>Order History</h2>
    
    
          <Table columns={columns} dataSource={data} bordered className="table" />
    
     
     
     
        
        </DefaultLayout>
      
     
     
     
)
}

export default OrderHistory