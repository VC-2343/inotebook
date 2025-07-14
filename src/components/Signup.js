import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
       const navigate = useNavigate();
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""});

     const handlesubmit=async(e)=>{
e.preventDefault();
const {name,email,password}=credentials;
  const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
          body: JSON.stringify({name,email,password })
    });
    const json=await response.json();
    console.log(json);
  
        localStorage.setItem('token',json.authtoken);
        navigate("/");
    }

     const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
         <form onSubmit={handlesubmit}>
  <div className="form-group my-4">
    <label htmlFor="name">Name</label>
    <input type="name" className="form-control" id="name" name='name' value={credentials.name} 
    onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    
      <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} 
    onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" name='password' className="form-control" value={credentials.password} 
    onChange={onChange} id="password" placeholder="Password"/>

     <label htmlFor="cpassword">Password</label>
    <input type="password" name='cpassword' className="form-control" value={credentials.cpassword} 
    onChange={onChange} id="cpassword" placeholder="confirm Password"/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
      
  )
}

export default Signup
