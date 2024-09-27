import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { fetchDetails } from './Auth'

const DeleteAcc = () => {
    const navigate = useNavigate()
    const data = fetchDetails()
    const u = data.user
    const pk = u.id

    const handleDel = () => {
      axios
      .delete(`http://127.0.0.1:8000/delete/${pk}`)
      .then(() => {
                localStorage.removeItem('tokenLS')
                localStorage.removeItem('details')
                navigate('/login')
      })
      .catch((err) => {
        console.log(err)
      })
    }
    const handleNoDel = () => {
        navigate('/home')
    }

  return (
    <div>
        <h1>Are you sure you want to delete your account?</h1>
        <div>
        <button onClick={handleDel}>Yes</button>
        <button onClick={handleNoDel}>No</button>
        </div>
       
    </div>
  )
}

export default DeleteAcc