import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router";
import { fetchToken } from './Auth';

const Signup = () => {
  const navigate = useNavigate()
    const [usernameInput, setUsernameInput] = useState()
    const [passwordInput, setPasswordInput] = useState()
    const [emailInput, setEmailInput] = useState()
    
    const handleUsernameChange = (event) => {
      setUsernameInput(event.target.value)
    }
  
    const handlePasswordChange = (event) => {
      setPasswordInput(event.target.value)
    }
  
    const handleEmailChange = (event) => {
        setEmailInput(event.target.value)
    }

    const handleLoginBtn = () => {
      axios
      .post('http://127.0.0.1:8000/signup', {
          "username": usernameInput, "password": passwordInput, "email": emailInput
      })
      .then(() => alert('Successfully registered user!'))
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
        {fetchToken() ? 
        <div>
        <h3>You're already logged in!</h3>
        <button onClick={signOut}>Sign out?</button>
        </div> 
        :
        <div>
        <h3>Sign up</h3>
        <input type='text' placeholder='Username' onChange={handleUsernameChange}/>
        <input type='password' placeholder='Password' onChange={handlePasswordChange}/>
        <input type='email' placeholder='Email' onChange={handleEmailChange}/>
        <button onClick={handleLoginBtn}>Sign up</button>
        <p>Already existing user? <span><Link to='/login'>Login here!</Link></span></p>
        </div>}
       
      </div>
        
    </div>
  )
}

export default Signup