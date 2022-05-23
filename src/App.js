import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/Notes/NotesState';
import {Alert}  from './components/Alert';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null)
  const showAlert = (message,type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <Alert alert={alert} />
      <div className='container'>
        <Routes>
          <Route exact path="/" caseSensitive={false} element={<Home showAlert={showAlert}/>} />
          <Route exact path="/about" caseSensitive={false} element={<About />} />
          <Route exact path="/login" caseSensitive={false} element={<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" caseSensitive={false} element={<Signup showAlert={showAlert}/>} />
    </Routes> 
    </div>
  </Router>
  </NoteState>
    </>
  );
}

export default App;
