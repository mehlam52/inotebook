import React, { useState, useContext }  from 'react'
import {useNavigate} from 'react-router-dom'


export const Signup = (props) => {
  const history = useNavigate();
  const [credentials, setCredentials]= useState({name:"",email:"",password:"",cpassword:""});
    
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(credentials.password === credentials.cpassword){
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
     body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}) 
        })
    const json = await response.json()
    console.log(json)
      //save auth token and redirect
      localStorage.setItem('token',json.authtoken);
      history("/login")
      props.showAlert("Account created successfully", "success")
    }
    else{
      // alert("Passwords dont match")
      props.showAlert("Password doesn't match", "danger")
    }
  }

  return (
    <>
    <div>
    <h2 className='mt-3'>SignUp</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="text" className="form-control" aria-describedby="emailHelp" name="name"  onChange={onChange} value={credentials.name}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"  onChange={onChange} value={credentials.email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} value={credentials.password}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" onChange={onChange} value={credentials.cpassword}/>
  </div>
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}
