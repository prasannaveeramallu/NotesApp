import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './NotesItems.css'

const NotesItems = (props) => {
    const {nData} = props
    const {description, title, user_id} = nData
    const {id} = nData
   
    const handleDelete = () => {
        axios
        .delete(`http://127.0.0.1:8000/${user_id}/home/${id}`)
        .then(() => window.location.reload())
        .catch((err) => {console.log(err)})
    }
   


    
  return (
    <div className='notes-bg-container'>
 <Link to='/editnotes' state={nData} className='link-tag'>
 <div className='notes-container'>
        <h3>{title}</h3>
        <p className='desc'>{description}</p>
        </div>     
    </Link>    
        <div className='btns'>
        
        <button onClick={handleDelete}>Delete</button>
        </div>
        


     </div>   
   
    
   
    
    
  )
}

export default NotesItems