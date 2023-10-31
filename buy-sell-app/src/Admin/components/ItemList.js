import {Card } from "antd";
import React from "react";

const ItemList = ({ item }) => {
 
 const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 230, marginBottom: 20 }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{ width: 220, height: 150, objectFit: "scale-down" }}
          />
        }
      >
        <div className="card_info">
        
          <Meta className="item_name" title={item.name} />
          <Meta title={`₹${item.price}`} />
        </div>
        
      </Card>
    </div>
  );
};

export default ItemList;
