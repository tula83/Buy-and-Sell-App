import React, {useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import '../CSS/DefaultLayout.css'
import logo from '../Images/logo-new.png'


import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  
  FileAddOutlined 
} from "@ant-design/icons";


const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  //const email = localStorage.getItem("admin");
  //const user_email = JSON.parse(email);
  
  
  const toggle = () => {
    setCollapsed(!collapsed);
  };



  return (
    <Layout>
      
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1 className="text-center text-light font-wight-bold mt-1"><img src={logo} alt="loading" 
          style={{ width: collapsed ? '80px' : '100%' }}
          /></h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
         
        >
          <Menu.Item key="/admin" icon={<HomeOutlined />}>
            <Link to="/admin-homepage">HomePage</Link>
          </Menu.Item>
          <Menu.Item key="/orders" icon={<CopyOutlined />}>
            <Link to="/admin-orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<FileAddOutlined/>}>
            <Link to="/admin-items">Add Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/admin-customers">Customers</Link>
          </Menu.Item>
          
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("admin");
              navigate("/admin-login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
        <div className="welcome_user">
          <h5>Welcome, admin!!</h5>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <h5 className="app_header"> Shopify App</h5>
        
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 14,
            minHeight: 280,
            
          }}
        >
         
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;