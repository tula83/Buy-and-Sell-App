/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import React from "react";
import DefaultLayout from "./Layout";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Table, Button, Form, Input, Select, message } from "antd";




const ItemPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopUpModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

   const getAllItems=async()=>{

    try{
      const {data}=await axios.get(`http://127.0.0.1:5000/product`);
      setItemsData(data);
    }
    catch(error){
      console.log('error in fetching data',error)
    }
   }
  
  //useEffect
  useEffect(() => {

    getAllItems();
          
  }, []);

  //handle delete
  const handleDelete = async (record) => {
    console.log(record._id)

    try{
         await axios.delete(`http://127.0.0.1:5000/product/${record._id}`);
         message.success("Item deleted successfully");
         getAllItems();
         setPopUpModal(false);

    }
    catch(error){
      message.error(" Something went wrong")
      console.log('error in deleting data')
    }
   
  };


  
  //handleSubmit
  const handleSubmit = async (value) => {
            console.log(value)
        if(editItem===null) {
          try{
           const res=await  axios.post(`http://127.0.0.1:5000/product`,value);
           console.log('result ',res);
           message.success("item added successfully")
           getAllItems();
           setPopUpModal(false);

          }
          catch(error){
            console.log('error in adding items',error)
          }
          

      }
      else{
             console.log(editItem._id)
        try{

            await axios.put(`http://127.0.0.1:5000/product/${editItem._id}`,{
              ...value
            });
            message.success("item updated successfully")
            getAllItems();
            setPopUpModal(false);
            setEditItem(null)

        }
        catch(error){
          message.error("Something went wrong")
          console.log('error in updating data',error)
        }


      }
  };


  //Table Data
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img
          src={image}
          alt={record.name}
          height="60"
          width="60"
          style={{ objectFit: "scale-down" }}
        />
      ),
    },
    { title: "Price", dataIndex: `price`,
    render :(price,record)=>(
         <div>
           <p>₹ {price}</p>
         </div>
    )
  
        
  },
    {title:'Description',dataIndex:"description"},



    {
      title: "Actions",
      dataIndex: "_id",
      render: (_id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopUpModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setPopUpModal(true)}>
          Add Item
        </Button>
      </div>

      <Table columns={columns} dataSource={itemsData} bordered className="table" />
      {popupModal && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          open={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopUpModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input  required/>
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input  required/>
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input required/>
            </Form.Item>

            <Form.Item name="description" label="Description">
            <Input required />
          </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="car">Cars</Select.Option>
                <Select.Option value="bike">Bike</Select.Option>
                <Select.Option value="mobile">Mobile</Select.Option>
                
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
