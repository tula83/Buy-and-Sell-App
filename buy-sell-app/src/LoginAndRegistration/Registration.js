import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import "./CSS/Mystyle.css"

const Register = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    const [userexist,setUserexist]=useState(false)
   
  


    

    const [inpval, setInpval] = useState({
        userName: "",
        email: "",
        password: "",
        cpassword: ""
    });


    const setVal = (e) => {
        //console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

const RegisterData=()=>{

    const { fname, email, password} = inpval;

    axios.post(`http://localhost:5000/users`, {
        
        "email": email,
        "password": password,
        "userName":fname
        
    }).then((resp) => {
        console.log(resp.status)
        if(resp.status===409){
            setUserexist(true)
        }
        else{
        const data = resp.data;
        if(data.name===fname){
            alert("successfully data sent")
        }
    }
       
    })
    .catch((error)=>{
        if(error.request.status===409){
            setUserexist(true)
        }
        console.log('error in registeration',error)
    })


       
}

    const addUserdata = (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;
        console.log(typeof +fname)

        if (fname === "" || isNaN(fname)===false) {
            alert("please enter your valid name");
           
            
            
        }
        else if (email === "") {
            alert("please enter your email");
           

            
        }
        else if (!email.includes("@")) {
            alert("enter valid email")
            
            
        }
        else if (password === "") {
            alert("please enter your password");
           

        }
        else if (password.length < 8) {
            alert("password must be 8 char long")
           
        }
        else if (cpassword === "") {
            alert("please enter your confirm password");
           
           
        }
        else if (cpassword.length < 8) {
            alert("password must be 8 char long")
           


            
        }
        else if (password !== cpassword) {
            alert("password and confirm password doesn't match")
           

        }
        else {
            RegisterData()     
        }
    
       
    
    
    }
    

    return (
        <>
          
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p>Help us become one of the safest places to buy and sell</p>

                    </div>

                    <form>
                        <div className='form_input'>
                            <label htmlFor='email'>Name</label>
                            <input type='text' onChange={setVal} value={inpval.fname} name='fname' id='fname' placeholder='Enter your name...' 
                            required
                            />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' onChange={setVal} value={inpval.email} name='email' id='email' placeholder='Enter Email Address...'
                            required
                            />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name='password' id='password' placeholder='Enter password...'
                                
                                required/>
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Confirm Password</label>
                            <div className='two'>
                                <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword} name='cpassword' id='cpassword' placeholder='Enter confirm password...'
                                required
                                />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className="btn" onClick={addUserdata}>Sign Up</button>

                        <p>Already have an account? <Link to="/">Log In</Link></p>
                    </form>
                    
                    {userexist?<h3>User already exists!!!! </h3>:false}
                
                    </div>
            </section>
        </>
    )
}

export default Register