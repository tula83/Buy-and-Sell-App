import React, { useEffect } from 'react'
import DefaultLayout from './Layout'
import { useState } from 'react'
import { Col, Row } from "antd";
import ItemList from './ItemList';
import axios from 'axios';


var items=[];

const categories=[

    {
        name: "bike",
        
      },
      {
        name: "car",
        
      },
      {
        name: "mobile",
        
      },
    
]


const AdminHomePage = () => {

    const [itemsData, setItemsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('bike');

    useEffect(()=>{
      axios.get(`http://localhost:5000/product`)
      .then((resp)=>{
         const data=resp.data;
         setItemsData(data);
         console.log(itemsData)
         items=itemsData;
      })
      .catch((error)=>{
        console.log('error in fetching data',error)
      })
    },[])

   
  return (
    <DefaultLayout>
    <div className="admin_homepage">
      {categories.map((category) => (
        <div
          key={category.name}
           className='category-header'
          onClick={() => setSelectedCategory(category.name)}
        >
          
          <h2>{category.name}</h2>
          
          

        </div>
       
      ))}
    </div>
   

    <Row>
    {itemsData
      .filter((i) => i.category === selectedCategory)
      .map((item) => (
        <Col xs={24} lg={6} md={12} sm={6}>
          <ItemList key={item.id} item={item} />
        </Col>
      ))}
  </Row>
   
  </DefaultLayout>
  )
}

export default AdminHomePage

export {items}; 
