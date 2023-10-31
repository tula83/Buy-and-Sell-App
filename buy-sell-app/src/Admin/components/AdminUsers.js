import { useEffect, useState } from "react";
import React from "react";
import DefaultLayout from "./Layout";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import {Table,message } from "antd";




const AdminUsers = () => {
    
    const [usersData, setusersData] = useState([]);
  



  const getAllusers=async()=>{

    try{
      const {data}=await axios.get(`http://127.0.0.1:5000/users`);
      setusersData(data);
    }
    catch(error){
      console.log('error in fetching data',error)
    }
   }
  
  //useEffect
  useEffect(() => {

    getAllusers();
          
  }, []);


  //handle delete
  const handleDelete = async (record) => {
    console.log(record._id)

    try{
         await axios.delete(`http://127.0.0.1:5000/user/${record._id}`);
         message.success("Users deleted successfully");
         getAllusers();
         

    }
    catch(error){
      message.error(" Something went wrong")
      console.log('error in deleting data')
    }
   
  };

  
//Table Data
const columns = [
    { title: "Name", dataIndex: "userName" },
    { title: "Email", dataIndex: "email" },
    { title: "Password", dataIndex: "password" },

    {
        title: "Actions",
        dataIndex: "_id",
        render: (_id, record) => (
          <div>
          
            <DeleteOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleDelete(record);
              }}
            />
          </div>
        ),
      },
]




  return (
    <DefaultLayout>
    <div className="d-flex justify-content-between">
      <h1>User List</h1>
     
    </div>

    <Table columns={columns} dataSource={usersData} bordered className="table" />
    
  </DefaultLayout>
  )
}

export default AdminUsers