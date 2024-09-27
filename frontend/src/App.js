import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import { RequireToken } from './components/Auth';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import EditNote from './components/EditNote';
import ChangePassword from './components/ChangePassword';
import DeleteAcc from './components/DeleteAcc';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/home" element={
        <RequireToken>
          <Home/>
        </RequireToken>
        }/>
        <Route path='/editnotes' element={<EditNote/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='/deleteacc' element={<DeleteAcc/>}/>
        </Routes>
      </Router>
       
    </div>
  );
}

export default App;
