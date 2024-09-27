import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
import NotesItems from "./NotesItems";
import './Home.css'
import { fetchDetails } from "./Auth";
import LongMenu from "./Menu";

export default function Home() {
  const navigate = useNavigate();

  const signOut = () => {
   
      localStorage.removeItem("tokenLS");
      localStorage.removeItem("details")
      navigate("/login");
      
      
  };

  
  const data = fetchDetails()
  console.log(data)
  const u = data.user
  const username = u.username
  const pk = u.id
  
 
  const [loading, setLoading] = useState(true)
  const [notesData, setNotesData] = useState([])
  useEffect(() => {
    axios
    .get(`http://127.0.0.1:8000/${pk}/home`)
    .then((response) => {
      setLoading(false)
        console.log(response)
        
        setNotesData(response.data)
      })
    .catch((err) => console.log(err))
  }, [])

 console.log("notesdata",notesData)
 const [create, setCreate] = useState(false)
const handleCreateNote = () => {
  setCreate(true)
}

const [notetitle, setNoteTitle] = useState()
const [noteDesc, setNoteDesc] = useState()


const handleTitle = (e) => {
    setNoteTitle(e.target.value)
}

const handleDescription = (e) => {
    setNoteDesc(e.target.value)
}



const handleSubmit = () => {

axios
.post(`http://127.0.0.1:8000/${pk}/home`, {
    "title": notetitle, "description": noteDesc, "user_id": pk
})
.then((res) => window.location.reload())
.catch((err) => {console.log(err)})
}
  return (
    <>
      <div style={{ marginTop: 20, minHeight: 700 }} className="bg-container">
        <div className="homepagesection">
        <h5>Home page</h5>
        <div className="features-sec">
        <button onClick={signOut} className="signoutbtn">Sign out</button>
      
        <LongMenu/>
        </div>
        </div>
        
        <h2>Hello there {username},  welcome to your home page</h2>
        
        <div className="create-section">
        <button onClick={handleCreateNote} className="createBtn">Create a new note</button>
        { create === false ? <p></p> : <div className="createEl">
          <input type='text' onChange={handleTitle} placeholder='Enter title'/>
         <textarea type='text' onChange={handleDescription} placeholder='Enter description'/>
         <button onClick={handleSubmit}>Submit</button>
        </div> }
        </div>
        
        <div>
          {loading === false ?  <ul>
           {notesData.map((each) => <NotesItems nData={each} key={each.id} />)} 
        </ul> : 
        <p>Loading...</p> }
        </div>
       
      </div>
    </>
  );
}