import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { useNavigate } from "react-router";
import { fetchToken, setToken, setDetails } from './Auth';



const Login = () => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState()
  const [passwordInput, setPasswordInput] = useState()
  
  const handleUsernameChange = (event) => {
    setUsernameInput(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value)
  }

  const handleLoginBtn = () => {
    axios
    .post('http://127.0.0.1:8000/login', {
        "username": usernameInput, "password": passwordInput
    })
    .then(function (response) {
        console.log(response.data.token, "response.data.token");
        if (response.data.token) {
          setToken(response.data.token);
          const dataToSend = response.data
          setDetails(dataToSend)
          navigate('/home')
          
    }})
    .catch((err) => console.log(err))
  }

  const signOut = () => {
    localStorage.removeItem("tokenLS");
    localStorage.removeItem("details")
    navigate('/login')
  };
  return (
    <div className='login-bg-container'>
        <div className='login-container'>
        {fetchToken() ? (
          <div>
            <h3>You're already logged in!</h3>
            <button onClick={signOut}>Signout?</button>
          </div>
         
        ) : (
            <div>
            <h1>Login</h1>  

            
            <input type='text' placeholder='Username' onChange={handleUsernameChange}/>
            <input type='password' placeholder='Password' onChange={handlePasswordChange}/>
            <div>
            <button onClick={handleLoginBtn}>Login</button>
            </div>  
            
            <p>New user? <span><Link to='/signup' className='signup-link'>Sign up here!</Link> </span></p>
            </div>
        )}
        </div>
       
    </div>
  )
}

export default Login