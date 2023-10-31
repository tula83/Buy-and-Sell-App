import { Nav, Form, Button, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import AllProducts from "./AllProducts";
import "../CSS/stylesNav.css";
import logo from "../Images/logo-new.png";
import sell from "../Images/sell.png";
import cart from "../Images/cart.png";
import logout from "../Images/logout.png";
import location from "../Images/location.png";
import search from "../Images/search.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {Routes,Route} from 'react-router-dom'
import Cars from  './Cars'
import Bikes from './Bikes'
import Mobiles from './Mobiles'
import Sell from "./Sell";
import ContactUs from "./ContactUs";
import Mycart from "./Cart";

import OrderHistory from "./OrderHistory";



 function MyNav() {

      const [query, setQuery] = useState("");
  const navigate = useNavigate();
  console.log(query)
  const HandleClick = () => {
      
    navigate("/user/product");
  };
  const handleLogout = () => {

     localStorage.removeItem("arr");
     localStorage.removeItem("current");

      
    navigate("/");
  };

  const handleSell = () => {
      
    navigate("/user/sell");
  };

  return (
    <>
    
      <nav>
        <header>
          <Link to='/user'>
            <img
              src={logo}
              width="75px"
              height="75px"
              className="d-inline-block align-top"
              alt="Your Logo"
            />
          </Link>

          <Form className="d-flex">
          <div variant="info" className="mr-2" style={{ width: "78px", height: "48px", marginTop:"0px", padding:"10px 1px 10px 24px", backgroundColor:"rgb(240, 241, 241)", border:"none"}} >
            <img
              src={location}
              width="30px"
              height="30px"
              className="d-inline-block align-top"
              alt="Your Logo"
            />
          </div>
          <Form.Control
            type="search"
            placeholder="Location"
            className="me-2"
            aria-label="Search"
            
            style={{ height: "48px" }}
          />
          
        </Form>

          <Form className="d-flex" >
          
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "400px", height: "48px" , marginRight:"0px"}}
          />
          <button variant="info" className="mr-2" onClick={HandleClick} style={{ width: "35px", height: "38px", marginTop:"0px", padding:"15px 1px 10px 1px", backgroundColor:"rgb(240, 241, 241)", border:"none"}} >
            <img
              src={search}
              width="25px"
              height="25px"
              className="d-inline-block align-top"
              alt="Your Logo"
            />
          </button>
        </Form>

          <div>
            <Button
              variant="primary"
              className="mr-2"
              style={{ marginRight: "10px" }}
              onClick={(e)=>{navigate("/user/cart")}}
            >
             
              <img
                src={cart}
                width="30px"
                height="30px"
                className="d-inline-block align-top"
                alt="Your Logo"
               
              />
            

            </Button>
            <Button variant="primary" style={{ marginRight: "30px" }} onClick={handleSell}>
              <img
                src={sell}
                width="30px"
                height="30px"
                className="d-inline-block align-top"
                alt="Your Logo"
              />
            </Button>
            <button variant="danger" onClick={handleLogout} style={{border:"none", paddingBottom:"7 px"}}>
              <img
                src={logout}
                width="30px"
                height="30px"
                
                alt="Your Logo"
              />
            </button>
          </div>
        </header>
        
        <div className="linkk">
            <NavDropdown title="All Catogeries" id="basic-nav-dropdown">
              <NavDropdown.Item href="/user/cars">Cars</NavDropdown.Item>
              <NavDropdown.Item href="/user/bikes">Bikes</NavDropdown.Item>
              <NavDropdown.Item href="/user/mobiles">Mobiles</NavDropdown.Item>
              
              
            </NavDropdown>
          <div className="linkkk">
          <Nav.Link as={Link} to="/user/cars" >
            Cars
          </Nav.Link>
          </div>
          <div className="linkkk">
          <Nav.Link as={Link} to="/user/bikes" className="linkkk">
            Bikes
          </Nav.Link>
          </div>
          <div className="linkkk">
          <Nav.Link as={Link} to="/user/mobiles" className="linkkk">
            Mobiles
          </Nav.Link>
          </div>
          
          <div className="linkkk">
          <Nav.Link as={Link} to="/user/contact" className="linkkk">
            Contact Us
          </Nav.Link>
          </div>
        </div>
      </nav>
      <Routes>
        
      <Route exact path="/" element={<AllProducts search={query}/>} />
      <Route path="/cars" element={<Cars search={query}/>} />
      <Route path="/bikes" element={<Bikes search={query}/>} />
      <Route path="/mobiles" element={<Mobiles search={query}/>} />
      <Route path="/contact" element={<ContactUs/>} />
      
      
      <Route path="/sell" element={<Sell />} />

      <Route path="/cart" element={<Mycart/>} />
      <Route path="/cart/history" element={<OrderHistory/>} />


      
      </Routes>
     
      
    </>
  );
}
export default MyNav;


