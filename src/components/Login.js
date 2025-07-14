
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
     const navigate = useNavigate();
    const [credentials,setcredentials]=useState({email:"",password:""});
    
    const handlesubmit=async(e)=>{
e.preventDefault();
  const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
          body: JSON.stringify({email:credentials.email,password:credentials.password })
    });
    const json=await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authtoken);
        toast.success("Login successful!");
        navigate("/");
    }
    else{
         toast.error("Invalid email or password.");
    }
    }
    const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
  <div className="form-group my-4">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" name='password' className="form-control" value={credentials.password} onChange={onChange} id="password" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
