import React, { useState } from "react";
import "./CSS/Mystyle.css"
import {LockOutlined, MailOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";





const AdminLogin = () => {

    const [passShow, setPassShow] = useState(false);
    const navigate=useNavigate();
   
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState(false)

   



    

    const loginuser = (e) => {
        e.preventDefault();

        if (password === "admin" && email === 'admin@gmail.com') {
            localStorage.setItem("admin", JSON.stringify({email,password}))
            console.log(JSON.parse(localStorage.getItem("admin")))
            navigate('/admin-homepage')

        }

        else{
            setError(true)
        }

            

        
    }
    
    const validate_form=()=>{

        
        setError(email && password)
        console.log(error)

    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome to Admin Login Page!!!</h1>
                        

                    </div>

                    <form className="user" id="admin">
                    
                    <div className='form_input'>
                    <label htmlFor="Email" style={{fontSize:"25px"}}>Email</label>
                          <div class='two'>
                          
                            <MailOutlined className='mail'/>
                            <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)
                            validate_form();
                            }
                        }
                             name='email' id='email' placeholder='Enter Email Address...'
                             required
                             />
                             </div>   
                   { (/\S+@\S+\.\S+/.test(email))?null:<div className="error-msg">Invalid Email </div>}


                        </div>

                        <div className='form_input'>
                            <label htmlFor='password' style={{fontSize:"25px"}}>Password</label>
                            <div className='two'>
                            <LockOutlined className='lock'/>
                                <input type={!passShow ? "password" : "text"} 
                                 value={password} onChange={(e)=>{setPassword(e.target.value);
                                validate_form()
                                } 
                            }
                                 name='password' id='password' placeholder='Enter password...' 
                                 
                                />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>

                            {password?"":<div className="error-msg">Invalid  password</div>}

                        </div>

                        <button className="btn" onClick={loginuser}>Login</button>

                         

                    </form>

                    {error ?" Not Found ":""}
                </div>
            </section>
        </>
    )
}
    

export default AdminLogin