import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EditNote.css'

const EditNote = () => {
    const location = useLocation();
    const data = location.state;
    const {id, description, title, user_id} = data
    const navigate = useNavigate()
    
 
    
    const [notetitle, setNoteTitle] = useState(title)
    const [noteDesc, setNoteDesc] = useState(description)
    

    const handleTitle = (e) => {
        setNoteTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setNoteDesc(e.target.value)
    }
    
  

    const handleSubmit = () => {
    axios
    .put(`http://127.0.0.1:8000/${user_id}/home/${id}`, {
        "title": notetitle, "description": noteDesc, "user_id": user_id
    })
    .then(() => navigate('/home'))
    .catch((err) => {console.log(err)})
}

    
    return (
        <div className='bg-container'>
           <Link to='/home' className='back-btn'>
          <button>Back</button>
          </Link>
          <div className='note-container'>
          <textarea  className='title-input' type='text' onChange={handleTitle}>{title}</textarea>
         <hr/>
          <textarea type='text'  className='desc-input' onChange={handleDescription}>{description}</textarea>
          </div>
          
          <div className='save-btn'>
          <button onClick={handleSubmit}>Save</button>
          </div>
          
         
        
        
        
        
       
          
        </div>
    )
}

export default EditNote