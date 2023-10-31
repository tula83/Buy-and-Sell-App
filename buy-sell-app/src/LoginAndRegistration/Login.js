import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./CSS/Mystyle.css"
import axios from "axios";


const arr=[];

//this email id is used in cart for getting items
var  email_id='';

const Login = () => {

    const [passShow, setPassShow] = useState(false);

    const navigate = useNavigate();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState(false)
   



    

    const loginuser = (e) => {


         e.preventDefault();

         

            axios.post(`http://localhost:5000/user`, {
                "email": email,
                "password": password
            }).then((resp) => {

            const data = resp.data;


                if (data.message === "found") {
                   
                    
                    arr.push({email, password})
                    localStorage.setItem("arr", JSON.stringify(arr));
                    email_id=email;
                    console.log(email_id)
                    localStorage.setItem("current",JSON.stringify({email}))

                    navigate("/user")
                }
                else{
                    setError(true)
                }

            }).catch((error) => {
                console.log('Error in fetching data', error)
                setError(true)
            })

            setPassword("");
            setEmail("");
    }

    

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome to Shopify!!!</h1>
                        

                    </div>

                    <form className="user" id="user">
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}
                             name='email' id='email' placeholder='Enter Email Address...'
                            required
                            />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input type={!passShow ? "password" : "text"} 
                                 value={password} onChange={(e)=>setPassword(e.target.value)} 
                                 name='password' id='password' placeholder='Enter password...' 
                                required
                                />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className="btn" onClick={loginuser}>Login</button>
                        {error ? <h3 style={{marginTop:"8px"}}>User not found </h3>:""}

                         <p>New to this website? <Link to="/register"> Sign Up</Link> </p>

                    </form>
                </div>
            </section>
        </>
    )
}

export default Login

export {email_id}