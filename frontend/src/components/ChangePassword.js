import React, {useState} from 'react'
import axios from 'axios'
import { fetchDetails } from './Auth'
import { useNavigate } from 'react-router-dom'



const ChangePassword = () => {
    const [pw, setPw] = useState()
    const [newpw, setNewpw] = useState()
    const navigate = useNavigate()
    const data = fetchDetails()
    const u = data.user

    const pk = u.id

    const handlepw = (event) => {
        setPw(event.target.value)
    }
    const handleNewpw = (event) => {
        setNewpw(event.target.value)
    }

    const handleSubmit = () => {
        
            axios
            .put((`http://127.0.0.1:8000/changepassword/${pk}`), {
                'password': pw, 'new_password': newpw
            })
            .then(() => {
                localStorage.removeItem('tokenLS')
                localStorage.removeItem('details')
                navigate('/login')
            })
            .catch((err) => {console.log(err)})
        
      
    }
  return (
    <div>
        <h1>Change password</h1>
        <input type='password' placeholder='Enter password' onChange={handlepw}/>
        <input type='password' placeholder='Enter new password' onChange={handleNewpw}/>
        <button onClick={handleSubmit}>Change password</button>
    </div>
  )
}

export default ChangePassword