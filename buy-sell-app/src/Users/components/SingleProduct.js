import React from "react";
import { useState, useEffect } from "react";

export default function SingleProduct(props) {
  const [data, setData] = useState([]);
  

  useEffect(() => {
     
  
    const apiUrl = `http://127.0.0.1:5000/product/${props.number}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <h2>Searched Product</h2>
      <div className="container">
      <p className="text-center" style={{display: data.length === 0 ? 'block' : 'none'}}>Searching....</p>
      <div className="row">
      <div className="col-md-4 mb-3">
        <div className="card" style={{ width: "18 rem" }}>
          <img className="card-img-top" src={data.image} alt="Card" />
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">{data.description}</p>
            <p className="card-text">{data.price} Rs</p>
            <a href="/" className="btn btn-primary">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
      </div>
      </div>
      ;
    </>
  );
}
