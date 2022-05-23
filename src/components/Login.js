import React, { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'

export const Login = (props) => {
    localStorage.setItem('token',"");
    const history = useNavigate();
    const [credentials, setCredentials]= useState({email:"",password:""});
    
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
     body: JSON.stringify({email:credentials.email,password:credentials.password}) 
        })
    const json = await response.json()
    // console.log(json.authToken)
    if(json.success){
      //save auth token and redirect
      localStorage.setItem('token',json.authToken);
      console.log(json.authToken)
      history("/")
      // console.log(localStorage.getItem('token'))
      props.showAlert("Login Success", "success")
      
    }
    else{
      // alert("invalid credentials")
      props.showAlert("Invalid credentials", "danger")
    }
  }
  return (
      <>
    <div>
      <h2 className='mt-3'>Login</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"  onChange={onChange} value={credentials.email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} value={credentials.password}/>
  </div>
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}
