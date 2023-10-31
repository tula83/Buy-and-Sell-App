import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Sell = () => {
  const [formData, setFormData] = useState({
    productId: Math.floor(Math.random() * 1000), // Generate a random productId
    category: "car", // Default category
    name: "",
    image: "",
    description: "",
    price: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the data to your API using Axios
      await axios.post("http://127.0.0.1:5000/product", formData);
      // Reset the form after successful submission
      setFormData({
        productId: Math.floor(Math.random() * 1000),
        category: "car",
        name: "",
        image: "",
        description: "",
        price: 0,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{margin:"50px 300px 50px 300px"}}>
      <h2>Add your Product</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Label htmlFor="name" >Name:</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{marginBottom:"50px"}}
          />
        </div>
        <div>
          <Form.Label htmlFor="image">Image URL:</Form.Label>
          <Form.Control
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            style={{marginBottom:"50px"}}
          />
        </div>
        <div>
          <Form.Label htmlFor="description">Description:</Form.Label>
          <Form.Control
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{marginBottom:"50px"}}
          />
        </div>
        <div>
          <Form.Label htmlFor="price">Price:</Form.Label>
          <Form.Control
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{marginBottom:"50px"}}
          />
        </div>
        <div>
          <Form.Label htmlFor="category">Category:</Form.Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{marginBottom:"50px"}}
          >
            <option value="car">Car</option>
            <option value="mobile">Mobile</option>
            <option value="bike">Bike</option>
          </select>
        </div>
        <Button variant="primary" className="mr-2" type="submit" style={{width:"100px", margin:"auto", padding:"5px 7px 5px 7px"}}>Sell</Button>
        
      </Form>
    </div>
  );
};

export default Sell;
